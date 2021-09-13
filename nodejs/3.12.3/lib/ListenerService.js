"use strict";
/*
 * Copyright (c) 2008-2020, Hazelcast, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var Promise = require("bluebird");
var events_1 = require("events");
var HazelcastError_1 = require("./HazelcastError");
var ClientEventRegistration_1 = require("./invocation/ClientEventRegistration");
var InvocationService_1 = require("./invocation/InvocationService");
var RegistrationKey_1 = require("./invocation/RegistrationKey");
var Util_1 = require("./Util");
var UuidUtil_1 = require("./util/UuidUtil");
var ListenerService = /** @class */ (function () {
    function ListenerService(client) {
        this.isShutdown = false;
        this.client = client;
        this.logger = this.client.getLoggingService().getLogger();
        this.isSmartService = this.client.getConfig().networkConfig.smartRouting;
        this.internalEventEmitter = new events_1.EventEmitter();
        this.internalEventEmitter.setMaxListeners(0);
        this.activeRegistrations = new Map();
        this.failedRegistrations = new Map();
        this.userRegistrationKeyInformation = new Map();
        this.connectionRefreshTaskInterval = 2000;
    }
    ListenerService.prototype.start = function () {
        this.client.getConnectionManager().on('connectionOpened', this.onConnectionAdded.bind(this));
        this.client.getConnectionManager().on('connectionClosed', this.onConnectionRemoved.bind(this));
        if (this.isSmart()) {
            this.connectionRefreshTask = this.connectionRefreshHandler();
        }
    };
    ListenerService.prototype.onConnectionAdded = function (connection) {
        this.reregisterListenersOnConnection(connection);
    };
    ListenerService.prototype.onConnectionRemoved = function (connection) {
        this.removeRegistrationsOnConnection(connection);
    };
    ListenerService.prototype.onHeartbeatRestored = function (connection) {
        var _this = this;
        var failedRegistrationsOnConn = this.failedRegistrations.get(connection);
        failedRegistrationsOnConn.forEach(function (userKey, ignored) {
            _this.invokeRegistrationFromRecord(userKey, connection);
        });
    };
    ListenerService.prototype.reregisterListeners = function () {
        var connections = this.client.getConnectionManager().getActiveConnections();
        for (var connAddress in connections) {
            this.reregisterListenersOnConnection(connections[connAddress]);
        }
    };
    ListenerService.prototype.reregisterListenersOnConnection = function (connection) {
        var _this = this;
        this.activeRegistrations.forEach(function (registrationMap, userKey) {
            if (registrationMap.has(connection)) {
                return;
            }
            _this.invokeRegistrationFromRecord(userKey, connection).then(function (eventRegistration) {
                registrationMap.set(connection, eventRegistration);
            }).catch(function (e) {
                _this.logger.warn('ListenerService', e);
            });
        }, this);
    };
    ListenerService.prototype.removeRegistrationsOnConnection = function (connection) {
        var _this = this;
        this.failedRegistrations.delete(connection);
        this.activeRegistrations.forEach(function (registrationsOnUserKey, userKey) {
            var eventRegistration = registrationsOnUserKey.get(connection);
            if (eventRegistration !== undefined) {
                _this.client.getInvocationService().removeEventHandler(eventRegistration.correlationId);
            }
        });
    };
    ListenerService.prototype.invokeRegistrationFromRecord = function (userRegistrationKey, connection) {
        var _this = this;
        var deferred = Util_1.DeferredPromise();
        var activeRegsOnUserKey = this.activeRegistrations.get(userRegistrationKey);
        if (activeRegsOnUserKey !== undefined && activeRegsOnUserKey.has(connection)) {
            deferred.resolve(activeRegsOnUserKey.get(connection));
            return deferred.promise;
        }
        var registrationKey = this.userRegistrationKeyInformation.get(userRegistrationKey);
        var registerRequest = registrationKey.getRegisterRequest();
        var codec = registrationKey.getCodec();
        var invocation = new InvocationService_1.Invocation(this.client, registerRequest);
        invocation.handler = registrationKey.getHandler();
        invocation.connection = connection;
        this.client.getInvocationService().invoke(invocation).then(function (responseMessage) {
            var correlationId = responseMessage.getCorrelationId();
            var response = codec.decodeAddResponse(responseMessage);
            var eventRegistration = new ClientEventRegistration_1.ClientEventRegistration(response, correlationId, invocation.connection, codec);
            _this.logger.debug('ListenerService', 'Listener ' + userRegistrationKey + ' re-registered on ' + connection.toString());
            deferred.resolve(eventRegistration);
        }).catch((function (e) {
            var failedRegsOnConnection = _this.failedRegistrations.get(connection);
            if (failedRegsOnConnection === undefined) {
                failedRegsOnConnection = new Set();
                failedRegsOnConnection.add(userRegistrationKey);
                _this.failedRegistrations.set(connection, failedRegsOnConnection);
            }
            else {
                failedRegsOnConnection.add(userRegistrationKey);
            }
            deferred.reject(new HazelcastError_1.HazelcastError('Could not add listener[' + userRegistrationKey +
                '] to connection[' + connection.toString() + ']', e));
        }));
        return deferred.promise;
    };
    ListenerService.prototype.registerListener = function (codec, registerHandlerFunc) {
        var _this = this;
        var readyToRegisterPromise;
        if (this.isSmart()) {
            readyToRegisterPromise = this.trySyncConnectToAllConnections();
        }
        else {
            // No need for preparation, just return a resolved promise
            readyToRegisterPromise = Promise.resolve();
        }
        return readyToRegisterPromise.then(function () {
            return _this.registerListenerInternal(codec, registerHandlerFunc);
        });
    };
    ListenerService.prototype.deregisterListener = function (userRegistrationKey) {
        var _this = this;
        var deferred = Util_1.DeferredPromise();
        var registrationsOnUserKey = this.activeRegistrations.get(userRegistrationKey);
        if (registrationsOnUserKey === undefined) {
            deferred.resolve(false);
            return deferred.promise;
        }
        registrationsOnUserKey.forEach(function (eventRegistration, connection) {
            var clientMessage = eventRegistration.codec.encodeRemoveRequest(eventRegistration.serverRegistrationId);
            var invocation = new InvocationService_1.Invocation(_this.client, clientMessage);
            invocation.connection = eventRegistration.subscriber;
            _this.client.getInvocationService().invoke(invocation).then(function (responseMessage) {
                registrationsOnUserKey.delete(connection);
                _this.client.getInvocationService().removeEventHandler(eventRegistration.correlationId);
                _this.logger.debug('ListenerService', 'Listener ' + userRegistrationKey + ' unregistered from ' + invocation.connection.toString());
                _this.activeRegistrations.delete(userRegistrationKey);
                _this.userRegistrationKeyInformation.delete(userRegistrationKey);
                deferred.resolve(true);
            });
        });
        return deferred.promise;
    };
    ListenerService.prototype.isSmart = function () {
        return this.isSmartService;
    };
    ListenerService.prototype.shutdown = function () {
        this.isShutdown = true;
        clearTimeout(this.connectionRefreshTask);
    };
    ListenerService.prototype.connectionRefreshHandler = function () {
        var _this = this;
        if (this.isShutdown) {
            return;
        }
        this.trySyncConnectToAllConnections().catch(function (e) {
        }).finally(function () {
            _this.connectionRefreshTask =
                setTimeout(_this.connectionRefreshHandler.bind(_this), _this.connectionRefreshTaskInterval);
        });
    };
    ListenerService.prototype.registerListenerInternal = function (codec, listenerHandlerFunc) {
        var _this = this;
        var activeConnections = Util_1.copyObjectShallow(this.client.getConnectionManager().getActiveConnections());
        var userRegistrationKey = UuidUtil_1.UuidUtil.generate().toString();
        var connectionsOnUserKey;
        var deferred = Util_1.DeferredPromise();
        var registerRequest = codec.encodeAddRequest(this.isSmart());
        connectionsOnUserKey = this.activeRegistrations.get(userRegistrationKey);
        if (connectionsOnUserKey === undefined) {
            connectionsOnUserKey = new Map();
            this.activeRegistrations.set(userRegistrationKey, connectionsOnUserKey);
            this.userRegistrationKeyInformation.set(userRegistrationKey, new RegistrationKey_1.RegistrationKey(userRegistrationKey, codec, registerRequest, listenerHandlerFunc));
        }
        var _loop_1 = function (address) {
            if (connectionsOnUserKey.has(activeConnections[address])) {
                return "continue";
            }
            var requestCopy = registerRequest.clone();
            var invocation = new InvocationService_1.Invocation(this_1.client, requestCopy);
            invocation.handler = listenerHandlerFunc;
            invocation.connection = activeConnections[address];
            this_1.client.getInvocationService().invoke(invocation).then(function (responseMessage) {
                var correlationId = responseMessage.getCorrelationId();
                var response = codec.decodeAddResponse(responseMessage);
                var clientEventRegistration = new ClientEventRegistration_1.ClientEventRegistration(response, correlationId, invocation.connection, codec);
                _this.logger.debug('ListenerService', 'Listener ' + userRegistrationKey + ' registered on ' + invocation.connection.toString());
                connectionsOnUserKey.set(activeConnections[address], clientEventRegistration);
            }).then(function () {
                deferred.resolve(userRegistrationKey);
            }).catch(function (e) {
                if (invocation.connection.isAlive()) {
                    _this.deregisterListener(userRegistrationKey);
                    deferred.reject(new HazelcastError_1.HazelcastError('Listener cannot be added!', e));
                }
            });
        };
        var this_1 = this;
        for (var address in activeConnections) {
            _loop_1(address);
        }
        return deferred.promise;
    };
    ListenerService.prototype.trySyncConnectToAllConnections = function () {
        var _this = this;
        assert(this.isSmart());
        var members = this.client.getClusterService().getMembers();
        var promises = [];
        members.forEach(function (member) {
            promises.push(_this.client.getConnectionManager().getOrConnect(member.address));
        });
        return Promise.all(promises).thenReturn();
    };
    return ListenerService;
}());
exports.ListenerService = ListenerService;
//# sourceMappingURL=ListenerService.js.map
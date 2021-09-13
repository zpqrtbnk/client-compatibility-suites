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
var Promise = require("bluebird");
var ClientAddMembershipListenerCodec_1 = require("../codec/ClientAddMembershipListenerCodec");
var ClientInfo_1 = require("../ClientInfo");
var HazelcastError_1 = require("../HazelcastError");
var assert = require("assert");
var Util_1 = require("../Util");
var MemberAttributeEvent_1 = require("../core/MemberAttributeEvent");
var MembershipEvent_1 = require("../core/MembershipEvent");
var UuidUtil_1 = require("../util/UuidUtil");
var MemberEvent;
(function (MemberEvent) {
    MemberEvent[MemberEvent["ADDED"] = 1] = "ADDED";
    MemberEvent[MemberEvent["REMOVED"] = 2] = "REMOVED";
})(MemberEvent = exports.MemberEvent || (exports.MemberEvent = {}));
/**
 * Manages the relationship of this client with the cluster.
 */
var ClusterService = /** @class */ (function () {
    function ClusterService(client) {
        /**
         * The unique identifier of the owner server node. This node is responsible for resource cleanup
         */
        this.ownerUuid = null;
        /**
         * The unique identifier of this client instance. Assigned by owner node on authentication
         */
        this.uuid = null;
        this.knownAddresses = [];
        this.members = [];
        this.membershipListeners = new Map();
        this.client = client;
        this.logger = this.client.getLoggingService().getLogger();
        this.members = [];
    }
    /**
     * Starts cluster service.
     * @returns
     */
    ClusterService.prototype.start = function () {
        this.initHeartbeatListener();
        this.initConnectionListener();
        return this.connectToCluster();
    };
    /**
     * Connects to cluster. It uses the addresses provided in the configuration.
     * @returns
     */
    ClusterService.prototype.connectToCluster = function () {
        var _this = this;
        return this.getPossibleMemberAddresses().then(function (res) {
            _this.knownAddresses = [];
            res.forEach(function (value) {
                _this.knownAddresses = _this.knownAddresses.concat(Util_1.AddressHelper.getSocketAddresses(value));
            });
            var attemptLimit = _this.client.getConfig().networkConfig.connectionAttemptLimit;
            var attemptPeriod = _this.client.getConfig().networkConfig.connectionAttemptPeriod;
            return _this.tryConnectingToAddresses(0, attemptLimit, attemptPeriod);
        });
    };
    ClusterService.prototype.getPossibleMemberAddresses = function () {
        var _this = this;
        var addresses = new Set();
        this.getMembers().forEach(function (member) {
            addresses.add(member.address.toString());
        });
        var providerAddresses = new Set();
        var promises = [];
        this.client.getConnectionManager().addressProviders.forEach(function (addressProvider) {
            promises.push(addressProvider.loadAddresses().then(function (res) {
                providerAddresses = new Set(Array.from(providerAddresses).concat(res));
            }).catch(function (err) {
                _this.logger.warn('Error from AddressProvider: ' + addressProvider, err);
            }));
        });
        return Promise.all(promises).then(function () {
            return Array.from(new Set(Array.from(addresses).concat(Array.from(providerAddresses))));
        });
    };
    /**
     * Returns the list of members in the cluster.
     * @returns
     */
    ClusterService.prototype.getMembers = function (selector) {
        if (selector === undefined) {
            return this.members;
        }
        else {
            var members_1 = [];
            this.members.forEach(function (member) {
                if (selector.select(member)) {
                    members_1.push(member);
                }
            });
            return members_1;
        }
    };
    ClusterService.prototype.getMember = function (uuid) {
        for (var _i = 0, _a = this.members; _i < _a.length; _i++) {
            var member = _a[_i];
            if (member.uuid === uuid) {
                return member;
            }
        }
        return null;
    };
    /**
     * Returns the number of nodes in cluster.
     * @returns {number}
     */
    ClusterService.prototype.getSize = function () {
        return this.members.length;
    };
    /**
     * Returns information about this client.
     * @returns {ClientInfo}
     */
    ClusterService.prototype.getClientInfo = function () {
        var info = new ClientInfo_1.ClientInfo();
        info.uuid = this.uuid;
        info.localAddress = this.getOwnerConnection().getLocalAddress();
        return info;
    };
    /**
     * Returns the connection associated with owner node of this client.
     * @returns {ClientConnection}
     */
    ClusterService.prototype.getOwnerConnection = function () {
        return this.ownerConnection;
    };
    /**
     * Adds MembershipListener to listen for membership updates. There is no check for duplicate registrations,
     * so if you register the listener twice, it will get events twice.
     * @param {MembershipListener} The listener to be registered
     * @return The registration ID
     */
    ClusterService.prototype.addMembershipListener = function (membershipListener) {
        var registrationId = UuidUtil_1.UuidUtil.generate().toString();
        this.membershipListeners.set(registrationId, membershipListener);
        return registrationId;
    };
    /**
     * Removes registered MembershipListener.
     * @param {string} The registration ID
     * @return {boolean} true if successfully removed, false otherwise
     */
    ClusterService.prototype.removeMembershipListener = function (registrationId) {
        if (registrationId === null) {
            throw new RangeError('registrationId cannot be null');
        }
        return this.membershipListeners.delete(registrationId);
    };
    ClusterService.prototype.initMembershipListener = function () {
        var _this = this;
        var request = ClientAddMembershipListenerCodec_1.ClientAddMembershipListenerCodec.encodeRequest(false);
        var handler = function (m) {
            var handleMember = _this.handleMember.bind(_this);
            var handleMemberList = _this.handleMemberList.bind(_this);
            var handleAttributeChange = _this.handleMemberAttributeChange.bind(_this);
            ClientAddMembershipListenerCodec_1.ClientAddMembershipListenerCodec.handle(m, handleMember, handleMemberList, handleAttributeChange, null);
        };
        return this.client.getInvocationService().invokeOnConnection(this.getOwnerConnection(), request, handler)
            .then(function (resp) {
            _this.logger.trace('ClusterService', 'Registered listener with id '
                + ClientAddMembershipListenerCodec_1.ClientAddMembershipListenerCodec.decodeResponse(resp).response);
        });
    };
    ClusterService.prototype.initHeartbeatListener = function () {
        this.client.getHeartbeat().addListener({
            onHeartbeatStopped: this.onHeartbeatStopped.bind(this),
        });
    };
    ClusterService.prototype.initConnectionListener = function () {
        this.client.getConnectionManager().on('connectionClosed', this.onConnectionClosed.bind(this));
    };
    ClusterService.prototype.onConnectionClosed = function (connection) {
        this.logger.warn('ClusterService', 'Connection closed to ' + connection.toString());
        if (connection.isAuthenticatedAsOwner()) {
            this.ownerConnection = null;
            this.connectToCluster().catch(this.client.shutdown.bind(this.client));
        }
    };
    ClusterService.prototype.onHeartbeatStopped = function (connection) {
        this.logger.warn('ClusterService', connection.toString() + ' stopped heartbeating.');
        if (connection.isAuthenticatedAsOwner()) {
            this.client.getConnectionManager().destroyConnection(connection.getAddress());
        }
    };
    ClusterService.prototype.tryConnectingToAddresses = function (index, remainingAttemptLimit, attemptPeriod, cause) {
        var _this = this;
        this.logger.debug('ClusterService', 'Trying to connect to addresses, remaining attempt limit: ' + remainingAttemptLimit
            + ', attempt period: ' + attemptPeriod);
        if (this.knownAddresses.length <= index) {
            remainingAttemptLimit = remainingAttemptLimit - 1;
            if (remainingAttemptLimit === 0) {
                var errorMessage = 'Unable to connect to any of the following addresses: ' +
                    this.knownAddresses.map(function (element) {
                        return element.toString();
                    }).join(', ');
                this.logger.debug('ClusterService', errorMessage);
                var error = new HazelcastError_1.IllegalStateError(errorMessage, cause);
                return Promise.reject(error);
            }
            else {
                var deferred_1 = Util_1.DeferredPromise();
                setTimeout(function () {
                    _this.tryConnectingToAddresses(0, remainingAttemptLimit, attemptPeriod).then(function () {
                        deferred_1.resolve();
                    }).catch(function (e) {
                        deferred_1.reject(e);
                    });
                }, attemptPeriod);
                return deferred_1.promise;
            }
        }
        else {
            var currentAddress = this.knownAddresses[index];
            return this.client.getConnectionManager().getOrConnect(currentAddress, true).then(function (connection) {
                connection.setAuthenticatedAsOwner(true);
                _this.ownerConnection = connection;
                return _this.initMembershipListener();
            }).catch(function (e) {
                _this.logger.warn('ClusterService', e);
                return _this.tryConnectingToAddresses(index + 1, remainingAttemptLimit, attemptPeriod, e);
            });
        }
    };
    ClusterService.prototype.handleMember = function (member, eventType) {
        if (eventType === MemberEvent.ADDED) {
            this.logger.info('ClusterService', member.toString() + ' added to cluster');
            this.memberAdded(member);
        }
        else if (eventType === MemberEvent.REMOVED) {
            this.logger.info('ClusterService', member.toString() + ' removed from cluster');
            this.memberRemoved(member);
        }
        this.client.getPartitionService().refresh();
    };
    ClusterService.prototype.handleMemberList = function (members) {
        var prevMembers = this.members;
        this.members = members;
        this.client.getPartitionService().refresh();
        this.logger.info('ClusterService', 'Members received.', this.members);
        var events = this.detectMembershipEvents(prevMembers);
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var event = events_1[_i];
            this.fireMembershipEvent(event);
        }
    };
    ClusterService.prototype.detectMembershipEvents = function (prevMembers) {
        var events = [];
        var eventMembers = Array.from(this.members);
        var addedMembers = [];
        var deletedMembers = Array.from(prevMembers);
        for (var _i = 0, _a = this.members; _i < _a.length; _i++) {
            var member = _a[_i];
            var idx = deletedMembers.findIndex(member.equals, member);
            if (idx === -1) {
                addedMembers.push(member);
            }
            else {
                deletedMembers.splice(idx, 1);
            }
        }
        // removal events should be added before added events
        for (var _b = 0, deletedMembers_1 = deletedMembers; _b < deletedMembers_1.length; _b++) {
            var member = deletedMembers_1[_b];
            events.push(new MembershipEvent_1.MembershipEvent(member, MemberEvent.REMOVED, eventMembers));
        }
        for (var _c = 0, addedMembers_1 = addedMembers; _c < addedMembers_1.length; _c++) {
            var member = addedMembers_1[_c];
            events.push(new MembershipEvent_1.MembershipEvent(member, MemberEvent.ADDED, eventMembers));
        }
        return events;
    };
    ClusterService.prototype.fireMembershipEvent = function (membershipEvent) {
        this.membershipListeners.forEach(function (membershipListener, registrationId) {
            if (membershipEvent.eventType === MemberEvent.ADDED) {
                if (membershipListener && membershipListener.memberAdded) {
                    membershipListener.memberAdded(membershipEvent);
                }
            }
            else if (membershipEvent.eventType === MemberEvent.REMOVED) {
                if (membershipListener && membershipListener.memberRemoved) {
                    membershipListener.memberRemoved(membershipEvent);
                }
            }
        });
    };
    ClusterService.prototype.handleMemberAttributeChange = function (uuid, key, operationType, value) {
        var _this = this;
        this.membershipListeners.forEach(function (membershipListener, registrationId) {
            if (membershipListener && membershipListener.memberAttributeChanged) {
                var member = _this.getMember(uuid);
                var memberAttributeEvent = new MemberAttributeEvent_1.MemberAttributeEvent(member, key, operationType, value);
                membershipListener.memberAttributeChanged(memberAttributeEvent);
            }
        });
    };
    ClusterService.prototype.memberAdded = function (member) {
        this.members.push(member);
        var membershipEvent = new MembershipEvent_1.MembershipEvent(member, MemberEvent.ADDED, this.members);
        this.fireMembershipEvent(membershipEvent);
    };
    ClusterService.prototype.memberRemoved = function (member) {
        var memberIndex = this.members.findIndex(member.equals, member);
        if (memberIndex !== -1) {
            var removedMemberList = this.members.splice(memberIndex, 1);
            assert(removedMemberList.length === 1);
        }
        this.client.getConnectionManager().destroyConnection(member.address);
        var membershipEvent = new MembershipEvent_1.MembershipEvent(member, MemberEvent.REMOVED, this.members);
        this.fireMembershipEvent(membershipEvent);
    };
    return ClusterService;
}());
exports.ClusterService = ClusterService;

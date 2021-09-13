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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var safe_buffer_1 = require("safe-buffer");
var Promise = require("bluebird");
var events_1 = require("events");
var HazelcastError_1 = require("../HazelcastError");
var ClientConnection_1 = require("./ClientConnection");
var ConnectionAuthenticator_1 = require("./ConnectionAuthenticator");
var net = require("net");
var tls = require("tls");
var Util_1 = require("../Util");
var BasicSSLOptionsFactory_1 = require("../connection/BasicSSLOptionsFactory");
var EMIT_CONNECTION_CLOSED = 'connectionClosed';
var EMIT_CONNECTION_OPENED = 'connectionOpened';
/**
 * Maintains connections between the client and members of the cluster.
 */
var ClientConnectionManager = /** @class */ (function (_super) {
    __extends(ClientConnectionManager, _super);
    function ClientConnectionManager(client, addressTranslator, addressProviders) {
        var _this = _super.call(this) || this;
        _this.establishedConnections = {};
        _this.pendingConnections = {};
        _this.client = client;
        _this.logger = _this.client.getLoggingService().getLogger();
        _this.addressTranslator = addressTranslator;
        _this.addressProviders = addressProviders;
        return _this;
    }
    ClientConnectionManager.prototype.getActiveConnections = function () {
        return this.establishedConnections;
    };
    /**
     * Returns the {@link ClientConnection} with given {@link Address}. If there is no such connection established,
     * it first connects to the address and then return the {@link ClientConnection}.
     * @param address
     * @param asOwner Sets the connected node as owner of this client if true.
     * @returns {Promise<ClientConnection>|Promise<T>}
     */
    ClientConnectionManager.prototype.getOrConnect = function (address, asOwner) {
        var _this = this;
        if (asOwner === void 0) { asOwner = false; }
        var addressIndex = address.toString();
        var establishedConnection = this.establishedConnections[addressIndex];
        if (establishedConnection) {
            return Promise.resolve(establishedConnection);
        }
        var pendingConnection = this.pendingConnections[addressIndex];
        if (pendingConnection) {
            return pendingConnection.promise;
        }
        var connectionResolver = Util_1.DeferredPromise();
        this.pendingConnections[addressIndex] = connectionResolver;
        var processResponseCallback = function (data) {
            _this.client.getInvocationService().processResponse(data);
        };
        this.addressTranslator.translate(address).then(function (addr) {
            if (addr == null) {
                throw new RangeError('Address Translator could not translate address ' + addr.toString());
            }
            _this.triggerConnect(addr, asOwner).then(function (socket) {
                var clientConnection = new ClientConnection_1.ClientConnection(_this.client, addr, socket);
                return _this.initiateCommunication(clientConnection).then(function () {
                    return clientConnection.registerResponseCallback(processResponseCallback);
                }).then(function () {
                    return _this.authenticate(clientConnection, asOwner);
                }).then(function () {
                    _this.establishedConnections[clientConnection.getAddress().toString()] = clientConnection;
                    _this.onConnectionOpened(clientConnection);
                    connectionResolver.resolve(clientConnection);
                });
            }).catch(function (e) {
                connectionResolver.reject(e);
            }).finally(function () {
                delete _this.pendingConnections[addressIndex];
            });
        });
        var connectionTimeout = this.client.getConfig().networkConfig.connectionTimeout;
        if (connectionTimeout !== 0) {
            return connectionResolver.promise.timeout(connectionTimeout, new HazelcastError_1.HazelcastError('Connection timed-out')).finally(function () {
                delete _this.pendingConnections[addressIndex];
            });
        }
        return connectionResolver.promise;
    };
    /**
     * Destroys the connection with given node address.
     * @param address
     */
    ClientConnectionManager.prototype.destroyConnection = function (address) {
        var addressStr = address.toString();
        if (this.pendingConnections.hasOwnProperty(addressStr)) {
            this.pendingConnections[addressStr].reject(null);
        }
        if (this.establishedConnections.hasOwnProperty(addressStr)) {
            var conn = this.establishedConnections[addressStr];
            delete this.establishedConnections[addressStr];
            conn.close();
            this.onConnectionClosed(conn);
        }
    };
    ClientConnectionManager.prototype.shutdown = function () {
        for (var pending in this.pendingConnections) {
            this.pendingConnections[pending].reject(new HazelcastError_1.ClientNotActiveError('Client is shutting down!'));
        }
        for (var conn in this.establishedConnections) {
            this.establishedConnections[conn].close();
        }
    };
    ClientConnectionManager.prototype.triggerConnect = function (address, asOwner) {
        var _this = this;
        if (!asOwner) {
            if (this.client.getClusterService().getOwnerConnection() == null) {
                var error = new HazelcastError_1.IllegalStateError('Owner connection is not available!');
                return Promise.reject(error);
            }
        }
        if (this.client.getConfig().networkConfig.sslConfig.enabled) {
            if (this.client.getConfig().networkConfig.sslConfig.sslOptions) {
                var opts = this.client.getConfig().networkConfig.sslConfig.sslOptions;
                return this.connectTLSSocket(address, opts);
            }
            else if (this.client.getConfig().networkConfig.sslConfig.sslOptionsFactoryConfig) {
                var factoryConfig = this.client.getConfig().networkConfig.sslConfig.sslOptionsFactoryConfig;
                var factoryProperties = this.client.getConfig().networkConfig.sslConfig.sslOptionsFactoryProperties;
                var factory_1;
                if (factoryConfig.path) {
                    factory_1 = new (Util_1.loadNameFromPath(factoryConfig.path, factoryConfig.exportedName))();
                }
                else {
                    factory_1 = new BasicSSLOptionsFactory_1.BasicSSLOptionsFactory();
                }
                return factory_1.init(factoryProperties).then(function () {
                    return _this.connectTLSSocket(address, factory_1.getSSLOptions());
                });
            }
            else {
                // the default behavior when ssl is enabled
                var opts = this.client.getConfig().networkConfig.sslConfig.sslOptions = {
                    checkServerIdentity: function () { return null; },
                    rejectUnauthorized: true,
                };
                return this.connectTLSSocket(address, opts);
            }
        }
        else {
            return this.connectNetSocket(address);
        }
    };
    ClientConnectionManager.prototype.connectTLSSocket = function (address, configOpts) {
        var _this = this;
        var connectionResolver = Util_1.DeferredPromise();
        var socket = tls.connect(address.port, address.host, configOpts);
        socket.once('secureConnect', function () {
            connectionResolver.resolve(socket);
        });
        socket.on('error', function (e) {
            _this.logger.warn('ClientConnectionManager', 'Could not connect to address ' + address.toString(), e);
            connectionResolver.reject(e);
            if (e.code === 'EPIPE' || e.code === 'ECONNRESET') {
                _this.destroyConnection(address);
            }
        });
        return connectionResolver.promise;
    };
    ClientConnectionManager.prototype.connectNetSocket = function (address) {
        var _this = this;
        var connectionResolver = Util_1.DeferredPromise();
        var socket = net.connect(address.port, address.host);
        socket.once('connect', function () {
            connectionResolver.resolve(socket);
        });
        socket.on('error', function (e) {
            _this.logger.warn('ClientConnectionManager', 'Could not connect to address ' + address.toString(), e);
            connectionResolver.reject(e);
            if (e.code === 'EPIPE' || e.code === 'ECONNRESET') {
                _this.destroyConnection(address);
            }
        });
        return connectionResolver.promise;
    };
    ClientConnectionManager.prototype.initiateCommunication = function (connection) {
        // Send the protocol version
        var buffer = safe_buffer_1.Buffer.from('CB2');
        return connection.write(buffer);
    };
    ClientConnectionManager.prototype.onConnectionClosed = function (connection) {
        this.emit(EMIT_CONNECTION_CLOSED, connection);
    };
    ClientConnectionManager.prototype.onConnectionOpened = function (connection) {
        this.emit(EMIT_CONNECTION_OPENED, connection);
    };
    ClientConnectionManager.prototype.authenticate = function (connection, ownerConnection) {
        var authenticator = new ConnectionAuthenticator_1.ConnectionAuthenticator(connection, this.client);
        return authenticator.authenticate(ownerConnection);
    };
    return ClientConnectionManager;
}(events_1.EventEmitter));
exports.ClientConnectionManager = ClientConnectionManager;
//# sourceMappingURL=ClientConnectionManager.js.map
"use strict";
/*
 * Copyright (c) 2008-2019, Hazelcast, Inc. All Rights Reserved.
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
var safe_buffer_1 = require("safe-buffer");
var BitsUtil_1 = require("../BitsUtil");
var BuildInfo_1 = require("../BuildInfo");
var HazelcastError_1 = require("../HazelcastError");
var Address = require("../Address");
var Util_1 = require("../Util");
var ClientConnection = /** @class */ (function () {
    function ClientConnection(client, address, socket) {
        this.heartbeating = true;
        this.startTime = Date.now();
        this.client = client;
        this.socket = socket;
        this.address = address;
        this.localAddress = new Address(socket.localAddress, socket.localPort);
        this.readBuffer = safe_buffer_1.Buffer.alloc(0);
        this.lastReadTimeMillis = 0;
        this.closedTime = 0;
        this.connectedServerVersionString = null;
        this.connectedServerVersion = BuildInfo_1.BuildInfo.UNKNOWN_VERSION_ID;
    }
    /**
     * Returns the address of local port that is associated with this connection.
     * @returns
     */
    ClientConnection.prototype.getLocalAddress = function () {
        return this.localAddress;
    };
    /**
     * Returns the address of remote node that is associated with this connection.
     * @returns
     */
    ClientConnection.prototype.getAddress = function () {
        return this.address;
    };
    ClientConnection.prototype.setAddress = function (address) {
        this.address = address;
    };
    ClientConnection.prototype.write = function (buffer) {
        var _this = this;
        var deferred = Util_1.DeferredPromise();
        try {
            this.socket.write(buffer, function (err) {
                if (err) {
                    deferred.reject(new HazelcastError_1.IOError(err));
                }
                else {
                    _this.lastWriteTimeMillis = Date.now();
                    deferred.resolve();
                }
            });
        }
        catch (err) {
            deferred.reject(new HazelcastError_1.IOError(err));
        }
        return deferred.promise;
    };
    ClientConnection.prototype.setConnectedServerVersion = function (versionString) {
        this.connectedServerVersionString = versionString;
        this.connectedServerVersion = BuildInfo_1.BuildInfo.calculateServerVersionFromString(versionString);
    };
    ClientConnection.prototype.getConnectedServerVersion = function () {
        return this.connectedServerVersion;
    };
    /**
     * Closes this connection.
     */
    ClientConnection.prototype.close = function () {
        this.socket.end();
        this.closedTime = Date.now();
    };
    ClientConnection.prototype.isAlive = function () {
        return this.closedTime === 0;
    };
    ClientConnection.prototype.isHeartbeating = function () {
        return this.heartbeating;
    };
    ClientConnection.prototype.setHeartbeating = function (heartbeating) {
        this.heartbeating = heartbeating;
    };
    ClientConnection.prototype.isAuthenticatedAsOwner = function () {
        return this.authenticatedAsOwner;
    };
    ClientConnection.prototype.setAuthenticatedAsOwner = function (asOwner) {
        this.authenticatedAsOwner = asOwner;
    };
    ClientConnection.prototype.getStartTime = function () {
        return this.startTime;
    };
    ClientConnection.prototype.getLastReadTimeMillis = function () {
        return this.lastReadTimeMillis;
    };
    ClientConnection.prototype.getLastWriteTimeMillis = function () {
        return this.lastWriteTimeMillis;
    };
    ClientConnection.prototype.toString = function () {
        return this.address.toString();
    };
    /**
     * Registers a function to pass received data on 'data' events on this connection.
     * @param callback
     */
    ClientConnection.prototype.registerResponseCallback = function (callback) {
        var _this = this;
        this.socket.on('data', function (buffer) {
            _this.lastReadTimeMillis = new Date().getTime();
            _this.readBuffer = safe_buffer_1.Buffer.concat([_this.readBuffer, buffer], _this.readBuffer.length + buffer.length);
            while (_this.readBuffer.length >= BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES) {
                var frameSize = _this.readBuffer.readInt32LE(0);
                if (frameSize > _this.readBuffer.length) {
                    return;
                }
                var message = safe_buffer_1.Buffer.allocUnsafe(frameSize);
                _this.readBuffer.copy(message, 0, 0, frameSize);
                _this.readBuffer = _this.readBuffer.slice(frameSize);
                callback(message);
            }
        });
        this.socket.on('error', function (e) {
            if (e.code === 'EPIPE' || e.code === 'ECONNRESET') {
                _this.client.getConnectionManager().destroyConnection(_this.address);
            }
        });
    };
    return ClientConnection;
}());
exports.ClientConnection = ClientConnection;
//# sourceMappingURL=ClientConnection.js.map
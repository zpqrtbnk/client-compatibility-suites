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
var ClientPingCodec_1 = require("./codec/ClientPingCodec");
var PROPERTY_HEARTBEAT_INTERVAL = 'hazelcast.client.heartbeat.interval';
var PROPERTY_HEARTBEAT_TIMEOUT = 'hazelcast.client.heartbeat.timeout';
/**
 * Hearbeat Service
 */
var Heartbeat = /** @class */ (function () {
    function Heartbeat(client) {
        this.listeners = [];
        this.client = client;
        this.logger = this.client.getLoggingService().getLogger();
        this.heartbeatInterval = this.client.getConfig().properties[PROPERTY_HEARTBEAT_INTERVAL];
        this.heartbeatTimeout = this.client.getConfig().properties[PROPERTY_HEARTBEAT_TIMEOUT];
    }
    /**
     * Starts sending periodic heartbeat operations.
     */
    Heartbeat.prototype.start = function () {
        this.timer = setTimeout(this.heartbeatFunction.bind(this), this.heartbeatInterval);
    };
    /**
     * Cancels scheduled heartbeat operations.
     */
    Heartbeat.prototype.cancel = function () {
        clearTimeout(this.timer);
    };
    /**
     * Registers a heartbeat listener. Listener is invoked when a heartbeat related event occurs.
     * @param heartbeatListener
     */
    Heartbeat.prototype.addListener = function (heartbeatListener) {
        this.listeners.push(heartbeatListener);
    };
    Heartbeat.prototype.heartbeatFunction = function () {
        var _this = this;
        var estConnections = this.client.getConnectionManager().establishedConnections;
        var _loop_1 = function (address) {
            if (estConnections[address]) {
                var conn_1 = estConnections[address];
                var now = Date.now();
                if (now - conn_1.getLastReadTimeMillis() > this_1.heartbeatTimeout) {
                    if (conn_1.isHeartbeating()) {
                        conn_1.setHeartbeating(false);
                        this_1.onHeartbeatStopped(conn_1);
                    }
                }
                if (now - conn_1.getLastWriteTimeMillis() > this_1.heartbeatInterval) {
                    var req = ClientPingCodec_1.ClientPingCodec.encodeRequest();
                    this_1.client.getInvocationService().invokeOnConnection(conn_1, req)
                        .catch(function (error) {
                        if (conn_1.isAlive()) {
                            _this.logger.warn('HeartbeatService', 'Error receiving ping answer from the connection: '
                                + conn_1 + ' ' + error);
                        }
                    });
                }
                else {
                    if (!conn_1.isHeartbeating()) {
                        conn_1.setHeartbeating(true);
                        this_1.onHeartbeatRestored(conn_1);
                    }
                }
            }
        };
        var this_1 = this;
        for (var address in estConnections) {
            _loop_1(address);
        }
        this.timer = setTimeout(this.heartbeatFunction.bind(this), this.heartbeatInterval);
    };
    Heartbeat.prototype.onHeartbeatStopped = function (connection) {
        var _this = this;
        this.logger.warn('HeartbeatService', 'Heartbeat stopped on ' + connection.toString());
        this.listeners.forEach(function (listener) {
            if (listener.hasOwnProperty('onHeartbeatStopped')) {
                setImmediate(listener.onHeartbeatStopped.bind(_this), connection);
            }
        });
    };
    Heartbeat.prototype.onHeartbeatRestored = function (connection) {
        var _this = this;
        this.logger.warn('HeartbeatService', 'Heartbeat restored on ' + connection.toString());
        this.listeners.forEach(function (listener) {
            if (listener.hasOwnProperty('onHeartbeatRestored')) {
                setImmediate(listener.onHeartbeatRestored.bind(_this), connection);
            }
        });
    };
    return Heartbeat;
}());
exports.Heartbeat = Heartbeat;
//# sourceMappingURL=HeartbeatService.js.map
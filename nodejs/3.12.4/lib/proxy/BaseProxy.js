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
var BuildInfo_1 = require("../BuildInfo");
/**
 * Common super class for any proxy.
 */
var BaseProxy = /** @class */ (function () {
    function BaseProxy(client, serviceName, name) {
        this.client = client;
        this.name = name;
        this.serviceName = serviceName;
    }
    BaseProxy.prototype.getPartitionKey = function () {
        return this.name;
    };
    /**
     * Returns name of the proxy.
     * @returns
     */
    BaseProxy.prototype.getName = function () {
        return this.name;
    };
    /**
     * Returns name of the service which this proxy belongs to.
     * Refer to service field of {@link ProxyManager} for service names.
     * @returns
     */
    BaseProxy.prototype.getServiceName = function () {
        return this.serviceName;
    };
    /**
     * Deletes the proxy object and frees allocated resources on cluster.
     * @returns
     */
    BaseProxy.prototype.destroy = function () {
        var _this = this;
        return this.client.getProxyManager().destroyProxy(this.name, this.serviceName).then(function () {
            return _this.postDestroy();
        });
    };
    BaseProxy.prototype.postDestroy = function () {
        return Promise.resolve();
    };
    /**
     * Encodes a request from a codec and invokes it on owner node of given key.
     * @param codec
     * @param partitionKey
     * @param codecArguments
     * @returns
     */
    BaseProxy.prototype.encodeInvokeOnKey = function (codec, partitionKey) {
        var codecArguments = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            codecArguments[_i - 2] = arguments[_i];
        }
        var partitionId = this.client.getPartitionService().getPartitionId(partitionKey);
        return this.encodeInvokeOnPartition.apply(this, [codec, partitionId].concat(codecArguments));
    };
    /**
     * Encodes a request from a codec and invokes it on owner node of given key.
     * This method also overrides invocation timeout.
     * @param timeoutMillis
     * @param codec
     * @param partitionKey
     * @param codecArguments
     * @returns
     */
    BaseProxy.prototype.encodeInvokeOnKeyWithTimeout = function (timeoutMillis, codec, partitionKey) {
        var codecArguments = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            codecArguments[_i - 3] = arguments[_i];
        }
        var partitionId = this.client.getPartitionService().getPartitionId(partitionKey);
        return this.encodeInvokeOnPartitionWithTimeout.apply(this, [timeoutMillis, codec, partitionId].concat(codecArguments));
    };
    /**
     * Encodes a request from a codec and invokes it on any node.
     * @param codec
     * @param codecArguments
     * @returns
     */
    BaseProxy.prototype.encodeInvokeOnRandomTarget = function (codec) {
        var codecArguments = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            codecArguments[_i - 1] = arguments[_i];
        }
        var clientMessage = codec.encodeRequest.apply(codec, [this.name].concat(codecArguments));
        var invocationResponse = this.client.getInvocationService().invokeOnRandomTarget(clientMessage);
        return this.createPromise(codec, invocationResponse);
    };
    BaseProxy.prototype.encodeInvokeOnAddress = function (codec, address) {
        var codecArguments = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            codecArguments[_i - 2] = arguments[_i];
        }
        var clientMessage = codec.encodeRequest.apply(codec, [this.name].concat(codecArguments));
        var invocation = this.client.getInvocationService().invokeOnTarget(clientMessage, address);
        return this.createPromise(codec, invocation);
    };
    /**
     * Encodes a request from a codec and invokes it on owner node of given partition.
     * @param codec
     * @param partitionId
     * @param codecArguments
     * @returns
     */
    BaseProxy.prototype.encodeInvokeOnPartition = function (codec, partitionId) {
        var codecArguments = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            codecArguments[_i - 2] = arguments[_i];
        }
        var clientMessage = codec.encodeRequest.apply(codec, [this.name].concat(codecArguments));
        var invocationResponse = this.client.getInvocationService()
            .invokeOnPartition(clientMessage, partitionId);
        return this.createPromise(codec, invocationResponse);
    };
    /**
     * Encodes a request from a codec and invokes it on owner node of given partition.
     * This method also overrides invocation timeout.
     * @param codec
     * @param partitionId
     * @param codecArguments
     * @returns
     */
    BaseProxy.prototype.encodeInvokeOnPartitionWithTimeout = function (timeoutMillis, codec, partitionId) {
        var codecArguments = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            codecArguments[_i - 3] = arguments[_i];
        }
        var clientMessage = codec.encodeRequest.apply(codec, [this.name].concat(codecArguments));
        var invocationResponse = this.client.getInvocationService()
            .invokeOnPartition(clientMessage, partitionId, timeoutMillis);
        return this.createPromise(codec, invocationResponse);
    };
    /**
     * Serializes an object according to serialization settings of the client.
     * @param object
     * @returns
     */
    BaseProxy.prototype.toData = function (object) {
        return this.client.getSerializationService().toData(object);
    };
    /**
     * De-serializes an object from binary form according to serialization settings of the client.
     * @param data
     * @returns {any}
     */
    BaseProxy.prototype.toObject = function (data) {
        return this.client.getSerializationService().toObject(data);
    };
    BaseProxy.prototype.getConnectedServerVersion = function () {
        var activeConnections = this.client.getConnectionManager().getActiveConnections();
        for (var address in activeConnections) {
            return activeConnections[address].getConnectedServerVersion();
        }
        return BuildInfo_1.BuildInfo.UNKNOWN_VERSION_ID;
    };
    BaseProxy.prototype.createPromise = function (codec, promise) {
        var toObject = this.toObject.bind(this);
        return promise.then(function (clientMessage) {
            if (codec.decodeResponse) {
                var raw = codec.decodeResponse(clientMessage, toObject);
                var response = raw.response;
                if (typeof response === 'undefined') {
                    return raw;
                }
                else {
                    return response;
                }
            }
        });
    };
    return BaseProxy;
}());
exports.BaseProxy = BaseProxy;

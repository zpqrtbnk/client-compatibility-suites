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
/* tslint:disable */
var ClientMessage = require("../ClientMessage");
var BitsUtil_1 = require("../BitsUtil");
var MapMessageType_1 = require("./MapMessageType");
var REQUEST_TYPE = MapMessageType_1.MapMessageType.MAP_GETALL;
var RESPONSE_TYPE = 117;
var RETRYABLE = false;
var MapGetAllCodec = /** @class */ (function () {
    function MapGetAllCodec() {
    }
    MapGetAllCodec.calculateSize = function (name, keys) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
        keys.forEach(function (keysItem) {
            dataSize += BitsUtil_1.BitsUtil.calculateSizeData(keysItem);
        });
        return dataSize;
    };
    MapGetAllCodec.encodeRequest = function (name, keys) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, keys));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendInt32(keys.length);
        keys.forEach(function (keysItem) {
            clientMessage.appendData(keysItem);
        });
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    MapGetAllCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'response': null
        };
        var responseSize = clientMessage.readInt32();
        var response = [];
        for (var responseIndex = 0; responseIndex < responseSize; responseIndex++) {
            var responseItem;
            var responseItemKey;
            var responseItemVal;
            responseItemKey = clientMessage.readData();
            responseItemVal = clientMessage.readData();
            responseItem = [responseItemKey, responseItemVal];
            response.push(responseItem);
        }
        parameters['response'] = response;
        return parameters;
    };
    return MapGetAllCodec;
}());
exports.MapGetAllCodec = MapGetAllCodec;
//# sourceMappingURL=MapGetAllCodec.js.map
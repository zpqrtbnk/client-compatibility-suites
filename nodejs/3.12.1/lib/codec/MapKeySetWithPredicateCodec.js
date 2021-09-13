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
/* tslint:disable */
var ClientMessage = require("../ClientMessage");
var BitsUtil_1 = require("../BitsUtil");
var MapMessageType_1 = require("./MapMessageType");
var REQUEST_TYPE = MapMessageType_1.MapMessageType.MAP_KEYSETWITHPREDICATE;
var RESPONSE_TYPE = 106;
var RETRYABLE = true;
var MapKeySetWithPredicateCodec = /** @class */ (function () {
    function MapKeySetWithPredicateCodec() {
    }
    MapKeySetWithPredicateCodec.calculateSize = function (name, predicate) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.calculateSizeData(predicate);
        return dataSize;
    };
    MapKeySetWithPredicateCodec.encodeRequest = function (name, predicate) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, predicate));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendData(predicate);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    MapKeySetWithPredicateCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'response': null
        };
        var responseSize = clientMessage.readInt32();
        var response = [];
        for (var responseIndex = 0; responseIndex < responseSize; responseIndex++) {
            var responseItem;
            responseItem = clientMessage.readData();
            response.push(responseItem);
        }
        parameters['response'] = response;
        return parameters;
    };
    return MapKeySetWithPredicateCodec;
}());
exports.MapKeySetWithPredicateCodec = MapKeySetWithPredicateCodec;
//# sourceMappingURL=MapKeySetWithPredicateCodec.js.map
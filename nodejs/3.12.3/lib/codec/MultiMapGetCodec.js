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
var MultiMapMessageType_1 = require("./MultiMapMessageType");
var REQUEST_TYPE = MultiMapMessageType_1.MultiMapMessageType.MULTIMAP_GET;
var RESPONSE_TYPE = 106;
var RETRYABLE = true;
var MultiMapGetCodec = /** @class */ (function () {
    function MultiMapGetCodec() {
    }
    MultiMapGetCodec.calculateSize = function (name, key, threadId) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.calculateSizeData(key);
        dataSize += BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
        return dataSize;
    };
    MultiMapGetCodec.encodeRequest = function (name, key, threadId) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, key, threadId));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendData(key);
        clientMessage.appendLong(threadId);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    MultiMapGetCodec.decodeResponse = function (clientMessage, toObjectFunction) {
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
    return MultiMapGetCodec;
}());
exports.MultiMapGetCodec = MultiMapGetCodec;
//# sourceMappingURL=MultiMapGetCodec.js.map
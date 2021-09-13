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
var QueueMessageType_1 = require("./QueueMessageType");
var REQUEST_TYPE = QueueMessageType_1.QueueMessageType.QUEUE_ITERATOR;
var RESPONSE_TYPE = 106;
var RETRYABLE = false;
var QueueIteratorCodec = /** @class */ (function () {
    function QueueIteratorCodec() {
    }
    QueueIteratorCodec.calculateSize = function (name) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        return dataSize;
    };
    QueueIteratorCodec.encodeRequest = function (name) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    QueueIteratorCodec.decodeResponse = function (clientMessage, toObjectFunction) {
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
    return QueueIteratorCodec;
}());
exports.QueueIteratorCodec = QueueIteratorCodec;

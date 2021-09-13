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
var ListMessageType_1 = require("./ListMessageType");
var REQUEST_TYPE = ListMessageType_1.ListMessageType.LIST_REMOVELISTENER;
var RESPONSE_TYPE = 101;
var RETRYABLE = true;
var ListRemoveListenerCodec = /** @class */ (function () {
    function ListRemoveListenerCodec() {
    }
    ListRemoveListenerCodec.calculateSize = function (name, registrationId) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(registrationId);
        return dataSize;
    };
    ListRemoveListenerCodec.encodeRequest = function (name, registrationId) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, registrationId));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendString(registrationId);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    ListRemoveListenerCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'response': null
        };
        parameters['response'] = clientMessage.readBoolean();
        return parameters;
    };
    return ListRemoveListenerCodec;
}());
exports.ListRemoveListenerCodec = ListRemoveListenerCodec;
//# sourceMappingURL=ListRemoveListenerCodec.js.map
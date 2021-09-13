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
var SetMessageType_1 = require("./SetMessageType");
var REQUEST_TYPE = SetMessageType_1.SetMessageType.SET_REMOVE;
var RESPONSE_TYPE = 101;
var RETRYABLE = false;
var SetRemoveCodec = /** @class */ (function () {
    function SetRemoveCodec() {
    }
    SetRemoveCodec.calculateSize = function (name, value) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.calculateSizeData(value);
        return dataSize;
    };
    SetRemoveCodec.encodeRequest = function (name, value) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, value));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendData(value);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    SetRemoveCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'response': null
        };
        parameters['response'] = clientMessage.readBoolean();
        return parameters;
    };
    return SetRemoveCodec;
}());
exports.SetRemoveCodec = SetRemoveCodec;
//# sourceMappingURL=SetRemoveCodec.js.map
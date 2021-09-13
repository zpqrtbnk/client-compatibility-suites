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
var ClientMessageType_1 = require("./ClientMessageType");
var REQUEST_TYPE = ClientMessageType_1.ClientMessageType.CLIENT_PING;
var RESPONSE_TYPE = 100;
var RETRYABLE = true;
var ClientPingCodec = /** @class */ (function () {
    function ClientPingCodec() {
    }
    ClientPingCodec.calculateSize = function () {
        // Calculates the request payload size
        var dataSize = 0;
        return dataSize;
    };
    ClientPingCodec.encodeRequest = function () {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize());
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    return ClientPingCodec;
}());
exports.ClientPingCodec = ClientPingCodec;

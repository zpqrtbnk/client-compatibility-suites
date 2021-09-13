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
var AddressCodec_1 = require("./AddressCodec");
var ClientMessageType_1 = require("./ClientMessageType");
var REQUEST_TYPE = ClientMessageType_1.ClientMessageType.CLIENT_CREATEPROXY;
var RESPONSE_TYPE = 100;
var RETRYABLE = false;
var ClientCreateProxyCodec = /** @class */ (function () {
    function ClientCreateProxyCodec() {
    }
    ClientCreateProxyCodec.calculateSize = function (name, serviceName, target) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(serviceName);
        dataSize += BitsUtil_1.BitsUtil.calculateSizeAddress(target);
        return dataSize;
    };
    ClientCreateProxyCodec.encodeRequest = function (name, serviceName, target) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, serviceName, target));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendString(serviceName);
        AddressCodec_1.AddressCodec.encode(clientMessage, target);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    return ClientCreateProxyCodec;
}());
exports.ClientCreateProxyCodec = ClientCreateProxyCodec;
//# sourceMappingURL=ClientCreateProxyCodec.js.map
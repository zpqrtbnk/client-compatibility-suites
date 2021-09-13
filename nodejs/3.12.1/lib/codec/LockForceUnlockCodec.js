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
var LockMessageType_1 = require("./LockMessageType");
var REQUEST_TYPE = LockMessageType_1.LockMessageType.LOCK_FORCEUNLOCK;
var RESPONSE_TYPE = 100;
var RETRYABLE = true;
var LockForceUnlockCodec = /** @class */ (function () {
    function LockForceUnlockCodec() {
    }
    LockForceUnlockCodec.calculateSize = function (name, referenceId) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
        return dataSize;
    };
    LockForceUnlockCodec.encodeRequest = function (name, referenceId) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, referenceId));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendLong(referenceId);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    return LockForceUnlockCodec;
}());
exports.LockForceUnlockCodec = LockForceUnlockCodec;
//# sourceMappingURL=LockForceUnlockCodec.js.map
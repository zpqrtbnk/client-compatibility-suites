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
var LockMessageType_1 = require("./LockMessageType");
var REQUEST_TYPE = LockMessageType_1.LockMessageType.LOCK_TRYLOCK;
var RESPONSE_TYPE = 101;
var RETRYABLE = true;
var LockTryLockCodec = /** @class */ (function () {
    function LockTryLockCodec() {
    }
    LockTryLockCodec.calculateSize = function (name, threadId, lease, timeout, referenceId) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
        return dataSize;
    };
    LockTryLockCodec.encodeRequest = function (name, threadId, lease, timeout, referenceId) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, threadId, lease, timeout, referenceId));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendLong(threadId);
        clientMessage.appendLong(lease);
        clientMessage.appendLong(timeout);
        clientMessage.appendLong(referenceId);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    LockTryLockCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'response': null
        };
        parameters['response'] = clientMessage.readBoolean();
        return parameters;
    };
    return LockTryLockCodec;
}());
exports.LockTryLockCodec = LockTryLockCodec;

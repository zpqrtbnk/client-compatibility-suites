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
var REQUEST_TYPE = MapMessageType_1.MapMessageType.MAP_SET;
var RESPONSE_TYPE = 100;
var RETRYABLE = false;
var MapSetCodec = /** @class */ (function () {
    function MapSetCodec() {
    }
    MapSetCodec.calculateSize = function (name, key, value, threadId, ttl) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.calculateSizeData(key);
        dataSize += BitsUtil_1.BitsUtil.calculateSizeData(value);
        dataSize += BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
        return dataSize;
    };
    MapSetCodec.encodeRequest = function (name, key, value, threadId, ttl) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, key, value, threadId, ttl));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendData(key);
        clientMessage.appendData(value);
        clientMessage.appendLong(threadId);
        clientMessage.appendLong(ttl);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    return MapSetCodec;
}());
exports.MapSetCodec = MapSetCodec;

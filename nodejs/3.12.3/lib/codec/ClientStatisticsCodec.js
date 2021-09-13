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
var ClientMessageType_1 = require("./ClientMessageType");
var REQUEST_TYPE = ClientMessageType_1.ClientMessageType.CLIENT_STATISTICS;
var RETRYABLE = false;
var ClientStatisticsCodec = /** @class */ (function () {
    function ClientStatisticsCodec() {
    }
    ClientStatisticsCodec.calculateSize = function (stats) {
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(stats);
        return dataSize;
    };
    ClientStatisticsCodec.encodeRequest = function (stats) {
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(stats));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(stats);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    return ClientStatisticsCodec;
}());
exports.ClientStatisticsCodec = ClientStatisticsCodec;
//# sourceMappingURL=ClientStatisticsCodec.js.map
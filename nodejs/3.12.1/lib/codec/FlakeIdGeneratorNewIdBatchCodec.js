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
var FlakeIdGeneratorMessageType_1 = require("./FlakeIdGeneratorMessageType");
var REQUEST_TYPE = FlakeIdGeneratorMessageType_1.FlakeIdGeneratorMessageType.FLAKEIDGENERATOR_NEWIDBATCH;
var RESPONSE_TYPE = 126;
var RETRYABLE = true;
var FlakeIdGeneratorNewIdBatchCodec = /** @class */ (function () {
    function FlakeIdGeneratorNewIdBatchCodec() {
    }
    FlakeIdGeneratorNewIdBatchCodec.calculateSize = function (name, batchSize) {
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(name);
        dataSize += BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
        return dataSize;
    };
    FlakeIdGeneratorNewIdBatchCodec.encodeRequest = function (name, batchSize) {
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, batchSize));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(name);
        clientMessage.appendInt32(batchSize);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    FlakeIdGeneratorNewIdBatchCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        var parameters = {
            'base': null,
            'increment': null,
            'batchSize': null
        };
        if (clientMessage.isComplete()) {
            return parameters;
        }
        parameters['base'] = clientMessage.readLong();
        parameters['increment'] = clientMessage.readLong();
        parameters['batchSize'] = clientMessage.readInt32();
        return parameters;
    };
    return FlakeIdGeneratorNewIdBatchCodec;
}());
exports.FlakeIdGeneratorNewIdBatchCodec = FlakeIdGeneratorNewIdBatchCodec;
//# sourceMappingURL=FlakeIdGeneratorNewIdBatchCodec.js.map
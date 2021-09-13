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
/* tslint:disable */
var ClientMessage = require("../ClientMessage");
var Address = require("../Address");
var GetPartitionsCodec = /** @class */ (function () {
    function GetPartitionsCodec() {
    }
    GetPartitionsCodec.encodeRequest = function () {
        var clientMessage = ClientMessage.newClientMessage(0);
        clientMessage.setMessageType(0x0008);
        return clientMessage;
    };
    GetPartitionsCodec.decodeResponse = function (clientMessage) {
        var result = {};
        var size = clientMessage.readInt32();
        for (var i = 0; i < size; i++) {
            var host = clientMessage.readString();
            var port = clientMessage.readInt32();
            var address = new Address(host, port);
            var partitionCount = clientMessage.readInt32();
            for (var j = 0; j < partitionCount; j++) {
                var partitionId = clientMessage.readInt32();
                result[partitionId] = address;
            }
        }
        return result;
    };
    return GetPartitionsCodec;
}());
module.exports = GetPartitionsCodec;
//# sourceMappingURL=GetPartitionsCodec.js.map
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
var MemberCodec_1 = require("./MemberCodec");
var ClientMessageType_1 = require("./ClientMessageType");
var REQUEST_TYPE = ClientMessageType_1.ClientMessageType.CLIENT_AUTHENTICATION;
var RESPONSE_TYPE = 107;
var RETRYABLE = true;
var ClientAuthenticationCodec = /** @class */ (function () {
    function ClientAuthenticationCodec() {
    }
    ClientAuthenticationCodec.calculateSize = function (username, password, uuid, ownerUuid, isOwnerConnection, clientType, serializationVersion, clientHazelcastVersion) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(username);
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(password);
        dataSize += BitsUtil_1.BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        if (uuid !== null) {
            dataSize += BitsUtil_1.BitsUtil.calculateSizeString(uuid);
        }
        dataSize += BitsUtil_1.BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        if (ownerUuid !== null) {
            dataSize += BitsUtil_1.BitsUtil.calculateSizeString(ownerUuid);
        }
        dataSize += BitsUtil_1.BitsUtil.BOOLEAN_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(clientType);
        dataSize += BitsUtil_1.BitsUtil.BYTE_SIZE_IN_BYTES;
        dataSize += BitsUtil_1.BitsUtil.calculateSizeString(clientHazelcastVersion);
        return dataSize;
    };
    ClientAuthenticationCodec.encodeRequest = function (username, password, uuid, ownerUuid, isOwnerConnection, clientType, serializationVersion, clientHazelcastVersion) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(username, password, uuid, ownerUuid, isOwnerConnection, clientType, serializationVersion, clientHazelcastVersion));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendString(username);
        clientMessage.appendString(password);
        clientMessage.appendBoolean(uuid === null);
        if (uuid !== null) {
            clientMessage.appendString(uuid);
        }
        clientMessage.appendBoolean(ownerUuid === null);
        if (ownerUuid !== null) {
            clientMessage.appendString(ownerUuid);
        }
        clientMessage.appendBoolean(isOwnerConnection);
        clientMessage.appendString(clientType);
        clientMessage.appendByte(serializationVersion);
        clientMessage.appendString(clientHazelcastVersion);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    ClientAuthenticationCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'status': null,
            'address': null,
            'uuid': null,
            'ownerUuid': null,
            'serializationVersion': null,
            'serverHazelcastVersion': null,
            'clientUnregisteredMembers': null
        };
        parameters['status'] = clientMessage.readByte();
        if (clientMessage.readBoolean() !== true) {
            parameters['address'] = AddressCodec_1.AddressCodec.decode(clientMessage, toObjectFunction);
        }
        if (clientMessage.readBoolean() !== true) {
            parameters['uuid'] = clientMessage.readString();
        }
        if (clientMessage.readBoolean() !== true) {
            parameters['ownerUuid'] = clientMessage.readString();
        }
        parameters['serializationVersion'] = clientMessage.readByte();
        if (clientMessage.isComplete()) {
            return parameters;
        }
        parameters['serverHazelcastVersion'] = clientMessage.readString();
        parameters.serverHazelcastVersionExist = true;
        if (clientMessage.readBoolean() !== true) {
            var clientUnregisteredMembersSize = clientMessage.readInt32();
            var clientUnregisteredMembers = [];
            for (var clientUnregisteredMembersIndex = 0; clientUnregisteredMembersIndex < clientUnregisteredMembersSize; clientUnregisteredMembersIndex++) {
                var clientUnregisteredMembersItem;
                clientUnregisteredMembersItem = MemberCodec_1.MemberCodec.decode(clientMessage, toObjectFunction);
                clientUnregisteredMembers.push(clientUnregisteredMembersItem);
            }
            parameters['clientUnregisteredMembers'] = clientUnregisteredMembers;
        }
        parameters.clientUnregisteredMembersExist = true;
        return parameters;
    };
    return ClientAuthenticationCodec;
}());
exports.ClientAuthenticationCodec = ClientAuthenticationCodec;
//# sourceMappingURL=ClientAuthenticationCodec.js.map
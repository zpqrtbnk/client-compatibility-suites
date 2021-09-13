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
var UUIDCodec_1 = require("./UUIDCodec");
var MapMessageType_1 = require("./MapMessageType");
var REQUEST_TYPE = MapMessageType_1.MapMessageType.MAP_FETCHNEARCACHEINVALIDATIONMETADATA;
var RESPONSE_TYPE = 122;
var RETRYABLE = false;
var MapFetchNearCacheInvalidationMetadataCodec = /** @class */ (function () {
    function MapFetchNearCacheInvalidationMetadataCodec() {
    }
    MapFetchNearCacheInvalidationMetadataCodec.calculateSize = function (names, address) {
        // Calculates the request payload size
        var dataSize = 0;
        dataSize += BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
        names.forEach(function (namesItem) {
            dataSize += BitsUtil_1.BitsUtil.calculateSizeString(namesItem);
        });
        dataSize += BitsUtil_1.BitsUtil.calculateSizeAddress(address);
        return dataSize;
    };
    MapFetchNearCacheInvalidationMetadataCodec.encodeRequest = function (names, address) {
        // Encode request into clientMessage
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(names, address));
        clientMessage.setMessageType(REQUEST_TYPE);
        clientMessage.setRetryable(RETRYABLE);
        clientMessage.appendInt32(names.length);
        names.forEach(function (namesItem) {
            clientMessage.appendString(namesItem);
        });
        AddressCodec_1.AddressCodec.encode(clientMessage, address);
        clientMessage.updateFrameLength();
        return clientMessage;
    };
    MapFetchNearCacheInvalidationMetadataCodec.decodeResponse = function (clientMessage, toObjectFunction) {
        if (toObjectFunction === void 0) { toObjectFunction = null; }
        // Decode response from client message
        var parameters = {
            'namePartitionSequenceList': null,
            'partitionUuidList': null
        };
        if (clientMessage.isComplete()) {
            return parameters;
        }
        var namePartitionSequenceListSize = clientMessage.readInt32();
        var namePartitionSequenceList = [];
        for (var namePartitionSequenceListIndex = 0; namePartitionSequenceListIndex < namePartitionSequenceListSize; namePartitionSequenceListIndex++) {
            var namePartitionSequenceListItem;
            var namePartitionSequenceListItemKey;
            var namePartitionSequenceListItemVal;
            namePartitionSequenceListItemKey = clientMessage.readString();
            var namePartitionSequenceListItemValSize = clientMessage.readInt32();
            var namePartitionSequenceListItemVal = [];
            for (var namePartitionSequenceListItemValIndex = 0; namePartitionSequenceListItemValIndex < namePartitionSequenceListItemValSize; namePartitionSequenceListItemValIndex++) {
                var namePartitionSequenceListItemValItem;
                var namePartitionSequenceListItemValItemKey;
                var namePartitionSequenceListItemValItemVal;
                namePartitionSequenceListItemValItemKey = clientMessage.readInt32();
                namePartitionSequenceListItemValItemVal = clientMessage.readLong();
                namePartitionSequenceListItemValItem = [namePartitionSequenceListItemValItemKey, namePartitionSequenceListItemValItemVal];
                namePartitionSequenceListItemVal.push(namePartitionSequenceListItemValItem);
            }
            namePartitionSequenceListItem = [namePartitionSequenceListItemKey, namePartitionSequenceListItemVal];
            namePartitionSequenceList.push(namePartitionSequenceListItem);
        }
        parameters['namePartitionSequenceList'] = namePartitionSequenceList;
        var partitionUuidListSize = clientMessage.readInt32();
        var partitionUuidList = [];
        for (var partitionUuidListIndex = 0; partitionUuidListIndex < partitionUuidListSize; partitionUuidListIndex++) {
            var partitionUuidListItem;
            var partitionUuidListItemKey;
            var partitionUuidListItemVal;
            partitionUuidListItemKey = clientMessage.readInt32();
            partitionUuidListItemVal = UUIDCodec_1.UUIDCodec.decode(clientMessage, toObjectFunction);
            partitionUuidListItem = [partitionUuidListItemKey, partitionUuidListItemVal];
            partitionUuidList.push(partitionUuidListItem);
        }
        parameters['partitionUuidList'] = partitionUuidList;
        return parameters;
    };
    return MapFetchNearCacheInvalidationMetadataCodec;
}());
exports.MapFetchNearCacheInvalidationMetadataCodec = MapFetchNearCacheInvalidationMetadataCodec;
//# sourceMappingURL=MapFetchNearCacheInvalidationMetadataCodec.js.map
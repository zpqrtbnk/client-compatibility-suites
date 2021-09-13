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
var MetadataContainer_1 = require("./MetadataContainer");
var RepairingHandler = /** @class */ (function () {
    function RepairingHandler(name, partitionService, nearCache, localUuid) {
        this.nearCache = nearCache;
        this.name = name;
        this.partitionService = partitionService;
        this.partitionCount = this.partitionService.getPartitionCount();
        this.localUuid = localUuid;
        this.containers = [];
        for (var i = 0; i < this.partitionCount; i++) {
            this.containers[i] = new MetadataContainer_1.MetadataContainer();
        }
    }
    RepairingHandler.prototype.initUuid = function (partitionIdUuidPairsList) {
        for (var _i = 0, partitionIdUuidPairsList_1 = partitionIdUuidPairsList; _i < partitionIdUuidPairsList_1.length; _i++) {
            var item = partitionIdUuidPairsList_1[_i];
            var partitionId = item[0];
            var partitionUuid = item[1];
            this.getMetadataContainer(partitionId).setUuid(partitionUuid);
        }
    };
    RepairingHandler.prototype.initSequence = function (partitionIdSequencePairsList) {
        var list = partitionIdSequencePairsList[1];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            var partitionId = item[0];
            var partitionSequence = item[1];
            this.getMetadataContainer(partitionId).setSequence(partitionSequence);
        }
    };
    RepairingHandler.prototype.handle = function (key, sourceUuid, partitionUuid, sequence) {
        if (this.localUuid !== sourceUuid) {
            if (key == null) {
                this.nearCache.clear();
            }
            else {
                this.nearCache.invalidate(key);
            }
        }
        var partitionId = this.getPartitionIdOrDefault(key);
        this.checkOrRepairSequence(partitionId, sequence);
        this.checkOrRepairUuid(partitionId, partitionUuid);
    };
    RepairingHandler.prototype.handleBatch = function (keys, sourceUuids, partitionUuids, sequences) {
        for (var i = 0; i < keys.length; i++) {
            this.handle(keys[i], sourceUuids[i], partitionUuids[i], sequences[i]);
        }
    };
    RepairingHandler.prototype.checkOrRepairSequence = function (partitionId, nextSequence, viaAntiEntropy) {
        if (viaAntiEntropy === void 0) { viaAntiEntropy = false; }
        var metadata = this.getMetadataContainer(partitionId);
        var current = metadata.getSequence();
        if (current.greaterThanOrEqual(nextSequence)) {
            return;
        }
        metadata.setSequence(nextSequence);
        var missed = nextSequence.subtract(current);
        if (!viaAntiEntropy) {
            missed = missed.subtract(1);
        }
        if (missed.greaterThan(0)) {
            metadata.increaseMissedSequenceCount(missed);
        }
    };
    RepairingHandler.prototype.checkOrRepairUuid = function (partitionId, newuuid) {
        var metadata = this.getMetadataContainer(partitionId);
        var currentUuid = metadata.getUuid();
        if (currentUuid != null && currentUuid.equals(newuuid)) {
            return;
        }
        metadata.setUuid(newuuid);
        metadata.reset();
    };
    RepairingHandler.prototype.updateLastKnownStaleSequence = function (metadataContainer) {
        var lastStaleSequence = metadataContainer.getStaleSequence();
        var lastSequence = metadataContainer.getSequence();
        if (lastStaleSequence.lessThan(lastSequence)) {
            metadataContainer.setStaleSequence(lastSequence);
        }
    };
    RepairingHandler.prototype.getMetadataContainer = function (partitionId) {
        return this.containers[partitionId];
    };
    RepairingHandler.prototype.getName = function () {
        return this.name;
    };
    RepairingHandler.prototype.getPartitionIdOrDefault = function (key) {
        if (key != null) {
            return this.partitionService.getPartitionId(key);
        }
        else {
            return this.partitionService.getPartitionId(this.name);
        }
    };
    return RepairingHandler;
}());
exports.RepairingHandler = RepairingHandler;

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
var StaleReadDetectorImpl = /** @class */ (function () {
    function StaleReadDetectorImpl(handler, partitionService) {
        this.repairingHandler = handler;
        this.partitionService = partitionService;
    }
    StaleReadDetectorImpl.prototype.isStaleRead = function (key, record) {
        var metadata = this.getMetadataContainer(this.getPartitionId(record.key));
        return !record.hasSameUuid(metadata.getUuid()) || record.getInvalidationSequence().lessThan(metadata.getStaleSequence());
    };
    StaleReadDetectorImpl.prototype.getMetadataContainer = function (partitionId) {
        return this.repairingHandler.getMetadataContainer(partitionId);
    };
    StaleReadDetectorImpl.prototype.getPartitionId = function (key) {
        return this.partitionService.getPartitionId(key);
    };
    return StaleReadDetectorImpl;
}());
exports.StaleReadDetectorImpl = StaleReadDetectorImpl;
//# sourceMappingURL=StaleReadDetectorImpl.js.map
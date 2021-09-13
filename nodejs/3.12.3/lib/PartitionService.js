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
var Promise = require("bluebird");
var GetPartitionsCodec = require("./codec/GetPartitionsCodec");
var PARTITION_REFRESH_INTERVAL = 10000;
var PartitionService = /** @class */ (function () {
    function PartitionService(client) {
        this.partitionMap = {};
        this.client = client;
        this.logger = client.getLoggingService().getLogger();
        this.isShutdown = false;
    }
    PartitionService.prototype.initialize = function () {
        this.partitionRefreshTask = setInterval(this.refresh.bind(this), PARTITION_REFRESH_INTERVAL);
        return this.refresh();
    };
    PartitionService.prototype.shutdown = function () {
        clearInterval(this.partitionRefreshTask);
        this.isShutdown = true;
    };
    /**
     * Refreshes the internal partition table.
     */
    PartitionService.prototype.refresh = function () {
        var _this = this;
        if (this.isShutdown) {
            return Promise.resolve();
        }
        var ownerConnection = this.client.getClusterService().getOwnerConnection();
        if (ownerConnection == null) {
            return Promise.resolve();
        }
        var clientMessage = GetPartitionsCodec.encodeRequest();
        return this.client.getInvocationService()
            .invokeOnConnection(ownerConnection, clientMessage)
            .then(function (response) {
            var receivedPartitionMap = GetPartitionsCodec.decodeResponse(response);
            for (var partitionId in receivedPartitionMap) {
                _this.partitionMap[partitionId] = receivedPartitionMap[partitionId];
            }
            _this.partitionCount = Object.keys(_this.partitionMap).length;
        }).catch(function (e) {
            if (_this.client.getLifecycleService().isRunning()) {
                _this.logger.warn('PartitionService', 'Error while fetching cluster partition table from'
                    + _this.client.getClusterService().ownerUuid, e);
            }
        });
    };
    /**
     * Returns the {@link Address} of the node which owns given partition id.
     * @param partitionId
     * @returns the address of the node.
     */
    PartitionService.prototype.getAddressForPartition = function (partitionId) {
        return this.partitionMap[partitionId];
    };
    /**
     * Computes the partition id for a given key.
     * @param key
     * @returns the partition id.
     */
    PartitionService.prototype.getPartitionId = function (key) {
        var partitionHash;
        if (typeof key === 'object' && 'getPartitionHash' in key) {
            partitionHash = key.getPartitionHash();
        }
        else {
            partitionHash = this.client.getSerializationService().toData(key).getPartitionHash();
        }
        return Math.abs(partitionHash) % this.partitionCount;
    };
    PartitionService.prototype.getPartitionCount = function () {
        return this.partitionCount;
    };
    return PartitionService;
}());
exports.PartitionService = PartitionService;
//# sourceMappingURL=PartitionService.js.map
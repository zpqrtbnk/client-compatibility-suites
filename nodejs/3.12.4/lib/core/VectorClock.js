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
var VectorClock = /** @class */ (function () {
    function VectorClock() {
        this.replicaTimestamps = new Map();
    }
    VectorClock.prototype.isAfter = function (other) {
        var _this = this;
        var atLeastOneBigger = false;
        other.replicaTimestamps.forEach(function (otherTimestamp, replicaId) {
            var thisTimetamp = _this.replicaTimestamps.get(replicaId);
            if (thisTimetamp == null || otherTimestamp.greaterThan(thisTimetamp)) {
                return false;
            }
            else if (otherTimestamp.lessThan(thisTimetamp)) {
                atLeastOneBigger = true;
            }
        });
        return atLeastOneBigger || this.replicaTimestamps.size > other.replicaTimestamps.size;
    };
    VectorClock.prototype.setReplicaTimestamp = function (replicaId, timestamp) {
        this.replicaTimestamps.set(replicaId, timestamp);
    };
    VectorClock.prototype.entrySet = function () {
        var entrySet = [];
        this.replicaTimestamps.forEach(function (timestamp, replicaId) {
            entrySet.push([replicaId, timestamp]);
        });
        return entrySet;
    };
    return VectorClock;
}());
exports.VectorClock = VectorClock;

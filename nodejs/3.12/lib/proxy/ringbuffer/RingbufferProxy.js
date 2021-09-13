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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var RingbufferAddAllCodec_1 = require("../../codec/RingbufferAddAllCodec");
var RingbufferAddCodec_1 = require("../../codec/RingbufferAddCodec");
var RingbufferCapacityCodec_1 = require("../../codec/RingbufferCapacityCodec");
var RingbufferHeadSequenceCodec_1 = require("../../codec/RingbufferHeadSequenceCodec");
var RingbufferReadManyCodec_1 = require("../../codec/RingbufferReadManyCodec");
var RingbufferReadOneCodec_1 = require("../../codec/RingbufferReadOneCodec");
var RingbufferRemainingCapacityCodec_1 = require("../../codec/RingbufferRemainingCapacityCodec");
var RingbufferSizeCodec_1 = require("../../codec/RingbufferSizeCodec");
var RingbufferTailSequenceCodec_1 = require("../../codec/RingbufferTailSequenceCodec");
var OverflowPolicy_1 = require("../../core/OverflowPolicy");
var PartitionSpecificProxy_1 = require("../PartitionSpecificProxy");
var LazyReadResultSet_1 = require("./LazyReadResultSet");
var Long = require("long");
var RingbufferProxy = /** @class */ (function (_super) {
    __extends(RingbufferProxy, _super);
    function RingbufferProxy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RingbufferProxy.prototype.capacity = function () {
        return this.encodeInvoke(RingbufferCapacityCodec_1.RingbufferCapacityCodec);
    };
    RingbufferProxy.prototype.size = function () {
        return this.encodeInvoke(RingbufferSizeCodec_1.RingbufferSizeCodec);
    };
    RingbufferProxy.prototype.tailSequence = function () {
        return this.encodeInvoke(RingbufferTailSequenceCodec_1.RingbufferTailSequenceCodec);
    };
    RingbufferProxy.prototype.headSequence = function () {
        return this.encodeInvoke(RingbufferHeadSequenceCodec_1.RingbufferHeadSequenceCodec);
    };
    RingbufferProxy.prototype.remainingCapacity = function () {
        return this.encodeInvoke(RingbufferRemainingCapacityCodec_1.RingbufferRemainingCapacityCodec);
    };
    RingbufferProxy.prototype.add = function (item, overflowPolicy) {
        if (overflowPolicy === void 0) { overflowPolicy = OverflowPolicy_1.OverflowPolicy.OVERWRITE; }
        return this.encodeInvoke(RingbufferAddCodec_1.RingbufferAddCodec, overflowPolicy, this.toData(item));
    };
    RingbufferProxy.prototype.addAll = function (items, overflowPolicy) {
        var _this = this;
        if (overflowPolicy === void 0) { overflowPolicy = OverflowPolicy_1.OverflowPolicy.OVERWRITE; }
        var dataList = items.map(function (item) {
            return _this.toData(item);
        });
        return this.encodeInvoke(RingbufferAddAllCodec_1.RingbufferAddAllCodec, dataList, overflowPolicy);
    };
    RingbufferProxy.prototype.readOne = function (sequence) {
        if (Long.fromValue(sequence).lessThan(0)) {
            throw new RangeError('Sequence number should not be less than zero, was: ' + sequence);
        }
        return this.encodeInvoke(RingbufferReadOneCodec_1.RingbufferReadOneCodec, sequence);
    };
    RingbufferProxy.prototype.readMany = function (sequence, minCount, maxCount, filter) {
        var _this = this;
        if (filter === void 0) { filter = null; }
        if (Long.fromValue(sequence).lessThan(0)) {
            throw new RangeError('Sequence number should not be less than zero, was: ' + sequence);
        }
        if (minCount < 0) {
            throw new RangeError('Min count should not be less than zero, was: ' + sequence);
        }
        if (minCount > maxCount) {
            throw new RangeError('Min count ' + minCount + 'was larger than max count ' + maxCount);
        }
        return this.encodeInvoke(RingbufferReadManyCodec_1.RingbufferReadManyCodec, sequence, minCount, maxCount, this.toData(filter))
            .then(function (raw) {
            return new LazyReadResultSet_1.LazyReadResultSet(_this.client.getSerializationService(), raw.readCount, raw.items, raw.itemSeqs);
        });
    };
    return RingbufferProxy;
}(PartitionSpecificProxy_1.PartitionSpecificProxy));
exports.RingbufferProxy = RingbufferProxy;
//# sourceMappingURL=RingbufferProxy.js.map
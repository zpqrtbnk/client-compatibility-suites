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
var Aggregator_1 = require("./Aggregator");
var HazelcastError_1 = require("../HazelcastError");
var AggregatorFactory = /** @class */ (function () {
    function AggregatorFactory() {
        this.idToConstructor = {};
        this.idToConstructor[AggregatorFactory.COUNT] = Aggregator_1.CountAggregator;
        this.idToConstructor[AggregatorFactory.DOUBLE_AVG] = Aggregator_1.DoubleAverageAggregator;
        this.idToConstructor[AggregatorFactory.DOUBLE_SUM] = Aggregator_1.DoubleSumAggregator;
        this.idToConstructor[AggregatorFactory.FIXED_SUM] = Aggregator_1.FixedPointSumAggregator;
        this.idToConstructor[AggregatorFactory.FLOATING_POINT_SUM] = Aggregator_1.FloatingPointSumAggregator;
        this.idToConstructor[AggregatorFactory.INT_AVG] = Aggregator_1.IntegerAverageAggregator;
        this.idToConstructor[AggregatorFactory.INT_SUM] = Aggregator_1.IntegerSumAggregator;
        this.idToConstructor[AggregatorFactory.LONG_AVG] = Aggregator_1.LongAverageAggregator;
        this.idToConstructor[AggregatorFactory.LONG_SUM] = Aggregator_1.LongSumAggregator;
        this.idToConstructor[AggregatorFactory.MAX] = Aggregator_1.MaxAggregator;
        this.idToConstructor[AggregatorFactory.MIN] = Aggregator_1.MinAggregator;
        this.idToConstructor[AggregatorFactory.NUMBER_AVG] = Aggregator_1.NumberAverageAggregator;
    }
    AggregatorFactory.prototype.create = function (type) {
        try {
            return (new this.idToConstructor[type]());
        }
        catch (e) {
            throw new HazelcastError_1.HazelcastError('There is no known aggregator with type id ' + type, e);
        }
    };
    AggregatorFactory.FACTORY_ID = -41;
    AggregatorFactory.BIG_DECIMAL_AVG = 0; // not implemented in node.js
    AggregatorFactory.BIG_DECIMAL_SUM = 1; // not implemented in node.js
    AggregatorFactory.BIG_INT_AVG = 2; // not implemented in node.js
    AggregatorFactory.BIG_INT_SUM = 3; // not implemented in node.js
    AggregatorFactory.COUNT = 4;
    AggregatorFactory.DISTINCT = 5; // returns java serializable, not usable in node.js
    AggregatorFactory.DOUBLE_AVG = 6;
    AggregatorFactory.DOUBLE_SUM = 7;
    AggregatorFactory.FIXED_SUM = 8;
    AggregatorFactory.FLOATING_POINT_SUM = 9;
    AggregatorFactory.INT_AVG = 10;
    AggregatorFactory.INT_SUM = 11;
    AggregatorFactory.LONG_AVG = 12;
    AggregatorFactory.LONG_SUM = 13;
    AggregatorFactory.MAX = 14;
    AggregatorFactory.MIN = 15;
    AggregatorFactory.NUMBER_AVG = 16;
    AggregatorFactory.MAX_BY = 17; // needs object to implement Java's Comparable interface
    AggregatorFactory.MIN_BY = 18; // needs object to implement Java's Comparable interface
    return AggregatorFactory;
}());
exports.AggregatorFactory = AggregatorFactory;
//# sourceMappingURL=AggregatorFactory.js.map
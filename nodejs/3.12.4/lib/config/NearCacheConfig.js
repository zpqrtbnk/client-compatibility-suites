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
var EvictionPolicy_1 = require("./EvictionPolicy");
var InMemoryFormat_1 = require("./InMemoryFormat");
var NearCacheConfig = /** @class */ (function () {
    function NearCacheConfig() {
        this.name = 'default';
        /**
         * 'true' to invalidate entries when they are changed in cluster,
         * 'false' to invalidate entries only when they are accessed.
         */
        this.invalidateOnChange = true;
        /**
         * Max number of seconds that an entry can stay in the cache until it is acceessed
         */
        this.maxIdleSeconds = 0;
        this.inMemoryFormat = InMemoryFormat_1.InMemoryFormat.BINARY;
        /**
         * Maximum number of seconds that an entry can stay in cache.
         */
        this.timeToLiveSeconds = 0;
        this.evictionPolicy = EvictionPolicy_1.EvictionPolicy.NONE;
        this.evictionMaxSize = Number.MAX_SAFE_INTEGER;
        this.evictionSamplingCount = 8;
        this.evictionSamplingPoolSize = 16;
    }
    NearCacheConfig.prototype.toString = function () {
        return 'NearCacheConfig[' +
            'name: ' + this.name + ', ' +
            'invalidateOnChange:' + this.invalidateOnChange + ', ' +
            'inMemoryFormat: ' + this.inMemoryFormat + ', ' +
            'ttl(sec): ' + this.timeToLiveSeconds + ', ' +
            'evictionPolicy: ' + this.evictionPolicy + ', ' +
            'evictionMaxSize: ' + this.evictionMaxSize + ', ' +
            'maxIdleSeconds: ' + this.maxIdleSeconds + ']';
    };
    NearCacheConfig.prototype.clone = function () {
        var other = new NearCacheConfig();
        Object.assign(other, this);
        return other;
    };
    return NearCacheConfig;
}());
exports.NearCacheConfig = NearCacheConfig;

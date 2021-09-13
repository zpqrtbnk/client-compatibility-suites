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
/**
 * Represents the format that objects are kept in this client's memory.
 */
var EvictionPolicy;
(function (EvictionPolicy) {
    EvictionPolicy[EvictionPolicy["NONE"] = 0] = "NONE";
    EvictionPolicy[EvictionPolicy["LRU"] = 1] = "LRU";
    EvictionPolicy[EvictionPolicy["LFU"] = 2] = "LFU";
    EvictionPolicy[EvictionPolicy["RANDOM"] = 3] = "RANDOM";
})(EvictionPolicy = exports.EvictionPolicy || (exports.EvictionPolicy = {}));

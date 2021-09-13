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
/* tslint:disable:no-bitwise */
var EventType;
(function (EventType) {
    EventType[EventType["ADDED"] = 1] = "ADDED";
    EventType[EventType["REMOVED"] = 2] = "REMOVED";
    EventType[EventType["UPDATED"] = 4] = "UPDATED";
    EventType[EventType["EVICTED"] = 8] = "EVICTED";
    EventType[EventType["EVICT_ALL"] = 16] = "EVICT_ALL";
    EventType[EventType["CLEAR_ALL"] = 32] = "CLEAR_ALL";
    EventType[EventType["MERGED"] = 64] = "MERGED";
    EventType[EventType["EXPIRED"] = 128] = "EXPIRED";
    EventType[EventType["INVALIDATION"] = 256] = "INVALIDATION";
})(EventType = exports.EventType || (exports.EventType = {}));
//# sourceMappingURL=EventType.js.map
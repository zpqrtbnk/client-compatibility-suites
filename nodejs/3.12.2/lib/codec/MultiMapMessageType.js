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
var MultiMapMessageType = /** @class */ (function () {
    function MultiMapMessageType() {
    }
    MultiMapMessageType.MULTIMAP_PUT = 0x0201;
    MultiMapMessageType.MULTIMAP_GET = 0x0202;
    MultiMapMessageType.MULTIMAP_REMOVE = 0x0203;
    MultiMapMessageType.MULTIMAP_KEYSET = 0x0204;
    MultiMapMessageType.MULTIMAP_VALUES = 0x0205;
    MultiMapMessageType.MULTIMAP_ENTRYSET = 0x0206;
    MultiMapMessageType.MULTIMAP_CONTAINSKEY = 0x0207;
    MultiMapMessageType.MULTIMAP_CONTAINSVALUE = 0x0208;
    MultiMapMessageType.MULTIMAP_CONTAINSENTRY = 0x0209;
    MultiMapMessageType.MULTIMAP_SIZE = 0x020a;
    MultiMapMessageType.MULTIMAP_CLEAR = 0x020b;
    MultiMapMessageType.MULTIMAP_VALUECOUNT = 0x020c;
    MultiMapMessageType.MULTIMAP_ADDENTRYLISTENERTOKEY = 0x020d;
    MultiMapMessageType.MULTIMAP_ADDENTRYLISTENER = 0x020e;
    MultiMapMessageType.MULTIMAP_REMOVEENTRYLISTENER = 0x020f;
    MultiMapMessageType.MULTIMAP_LOCK = 0x0210;
    MultiMapMessageType.MULTIMAP_TRYLOCK = 0x0211;
    MultiMapMessageType.MULTIMAP_ISLOCKED = 0x0212;
    MultiMapMessageType.MULTIMAP_UNLOCK = 0x0213;
    MultiMapMessageType.MULTIMAP_FORCEUNLOCK = 0x0214;
    MultiMapMessageType.MULTIMAP_REMOVEENTRY = 0x0215;
    return MultiMapMessageType;
}());
exports.MultiMapMessageType = MultiMapMessageType;
//# sourceMappingURL=MultiMapMessageType.js.map
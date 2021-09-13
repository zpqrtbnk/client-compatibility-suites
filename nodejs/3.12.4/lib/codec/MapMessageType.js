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
/* tslint:disable */
var MapMessageType = /** @class */ (function () {
    function MapMessageType() {
    }
    MapMessageType.MAP_PUT = 0x0101;
    MapMessageType.MAP_GET = 0x0102;
    MapMessageType.MAP_REMOVE = 0x0103;
    MapMessageType.MAP_REPLACE = 0x0104;
    MapMessageType.MAP_REPLACEIFSAME = 0x0105;
    MapMessageType.MAP_CONTAINSKEY = 0x0109;
    MapMessageType.MAP_CONTAINSVALUE = 0x010a;
    MapMessageType.MAP_REMOVEIFSAME = 0x010b;
    MapMessageType.MAP_DELETE = 0x010c;
    MapMessageType.MAP_FLUSH = 0x010d;
    MapMessageType.MAP_TRYREMOVE = 0x010e;
    MapMessageType.MAP_TRYPUT = 0x010f;
    MapMessageType.MAP_PUTTRANSIENT = 0x0110;
    MapMessageType.MAP_PUTIFABSENT = 0x0111;
    MapMessageType.MAP_SET = 0x0112;
    MapMessageType.MAP_LOCK = 0x0113;
    MapMessageType.MAP_TRYLOCK = 0x0114;
    MapMessageType.MAP_ISLOCKED = 0x0115;
    MapMessageType.MAP_UNLOCK = 0x0116;
    MapMessageType.MAP_ADDINTERCEPTOR = 0x0117;
    MapMessageType.MAP_REMOVEINTERCEPTOR = 0x0118;
    MapMessageType.MAP_ADDENTRYLISTENERTOKEYWITHPREDICATE = 0x0119;
    MapMessageType.MAP_ADDENTRYLISTENERWITHPREDICATE = 0x011a;
    MapMessageType.MAP_ADDENTRYLISTENERTOKEY = 0x011b;
    MapMessageType.MAP_ADDENTRYLISTENER = 0x011c;
    MapMessageType.MAP_ADDNEARCACHEENTRYLISTENER = 0x011d;
    MapMessageType.MAP_REMOVEENTRYLISTENER = 0x011e;
    MapMessageType.MAP_ADDPARTITIONLOSTLISTENER = 0x011f;
    MapMessageType.MAP_REMOVEPARTITIONLOSTLISTENER = 0x0120;
    MapMessageType.MAP_GETENTRYVIEW = 0x0121;
    MapMessageType.MAP_EVICT = 0x0122;
    MapMessageType.MAP_EVICTALL = 0x0123;
    MapMessageType.MAP_LOADALL = 0x0124;
    MapMessageType.MAP_LOADGIVENKEYS = 0x0125;
    MapMessageType.MAP_KEYSET = 0x0126;
    MapMessageType.MAP_GETALL = 0x0127;
    MapMessageType.MAP_VALUES = 0x0128;
    MapMessageType.MAP_ENTRYSET = 0x0129;
    MapMessageType.MAP_KEYSETWITHPREDICATE = 0x012a;
    MapMessageType.MAP_VALUESWITHPREDICATE = 0x012b;
    MapMessageType.MAP_ENTRIESWITHPREDICATE = 0x012c;
    MapMessageType.MAP_ADDINDEX = 0x012d;
    MapMessageType.MAP_SIZE = 0x012e;
    MapMessageType.MAP_ISEMPTY = 0x012f;
    MapMessageType.MAP_PUTALL = 0x0130;
    MapMessageType.MAP_CLEAR = 0x0131;
    MapMessageType.MAP_EXECUTEONKEY = 0x0132;
    MapMessageType.MAP_SUBMITTOKEY = 0x0133;
    MapMessageType.MAP_EXECUTEONALLKEYS = 0x0134;
    MapMessageType.MAP_EXECUTEWITHPREDICATE = 0x0135;
    MapMessageType.MAP_EXECUTEONKEYS = 0x0136;
    MapMessageType.MAP_FORCEUNLOCK = 0x0137;
    MapMessageType.MAP_KEYSETWITHPAGINGPREDICATE = 0x0138;
    MapMessageType.MAP_VALUESWITHPAGINGPREDICATE = 0x0139;
    MapMessageType.MAP_ENTRIESWITHPAGINGPREDICATE = 0x013a;
    MapMessageType.MAP_CLEARNEARCACHE = 0x013b;
    MapMessageType.MAP_FETCHKEYS = 0x013c;
    MapMessageType.MAP_FETCHENTRIES = 0x013d;
    MapMessageType.MAP_AGGREGATE = 0x013e;
    MapMessageType.MAP_AGGREGATEWITHPREDICATE = 0x013f;
    MapMessageType.MAP_PROJECT = 0x0140;
    MapMessageType.MAP_PROJECTWITHPREDICATE = 0x0141;
    MapMessageType.MAP_FETCHNEARCACHEINVALIDATIONMETADATA = 0x0142;
    MapMessageType.MAP_ASSIGNANDGETUUIDS = 0x0143;
    MapMessageType.MAP_REMOVEALL = 0x0144;
    MapMessageType.MAP_ADDNEARCACHEINVALIDATIONLISTENER = 0x0145;
    MapMessageType.MAP_FETCHWITHQUERY = 0x0146;
    MapMessageType.MAP_EVENTJOURNALSUBSCRIBE = 0x0147;
    MapMessageType.MAP_EVENTJOURNALREAD = 0x0148;
    return MapMessageType;
}());
exports.MapMessageType = MapMessageType;

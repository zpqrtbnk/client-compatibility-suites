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
var ListMessageType = /** @class */ (function () {
    function ListMessageType() {
    }
    ListMessageType.LIST_SIZE = 0x0501;
    ListMessageType.LIST_CONTAINS = 0x0502;
    ListMessageType.LIST_CONTAINSALL = 0x0503;
    ListMessageType.LIST_ADD = 0x0504;
    ListMessageType.LIST_REMOVE = 0x0505;
    ListMessageType.LIST_ADDALL = 0x0506;
    ListMessageType.LIST_COMPAREANDREMOVEALL = 0x0507;
    ListMessageType.LIST_COMPAREANDRETAINALL = 0x0508;
    ListMessageType.LIST_CLEAR = 0x0509;
    ListMessageType.LIST_GETALL = 0x050a;
    ListMessageType.LIST_ADDLISTENER = 0x050b;
    ListMessageType.LIST_REMOVELISTENER = 0x050c;
    ListMessageType.LIST_ISEMPTY = 0x050d;
    ListMessageType.LIST_ADDALLWITHINDEX = 0x050e;
    ListMessageType.LIST_GET = 0x050f;
    ListMessageType.LIST_SET = 0x0510;
    ListMessageType.LIST_ADDWITHINDEX = 0x0511;
    ListMessageType.LIST_REMOVEWITHINDEX = 0x0512;
    ListMessageType.LIST_LASTINDEXOF = 0x0513;
    ListMessageType.LIST_INDEXOF = 0x0514;
    ListMessageType.LIST_SUB = 0x0515;
    ListMessageType.LIST_ITERATOR = 0x0516;
    ListMessageType.LIST_LISTITERATOR = 0x0517;
    return ListMessageType;
}());
exports.ListMessageType = ListMessageType;

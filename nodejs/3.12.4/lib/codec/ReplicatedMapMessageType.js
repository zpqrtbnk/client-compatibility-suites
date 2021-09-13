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
var ReplicatedMapMessageType = /** @class */ (function () {
    function ReplicatedMapMessageType() {
    }
    ReplicatedMapMessageType.REPLICATEDMAP_PUT = 0x0e01;
    ReplicatedMapMessageType.REPLICATEDMAP_SIZE = 0x0e02;
    ReplicatedMapMessageType.REPLICATEDMAP_ISEMPTY = 0x0e03;
    ReplicatedMapMessageType.REPLICATEDMAP_CONTAINSKEY = 0x0e04;
    ReplicatedMapMessageType.REPLICATEDMAP_CONTAINSVALUE = 0x0e05;
    ReplicatedMapMessageType.REPLICATEDMAP_GET = 0x0e06;
    ReplicatedMapMessageType.REPLICATEDMAP_REMOVE = 0x0e07;
    ReplicatedMapMessageType.REPLICATEDMAP_PUTALL = 0x0e08;
    ReplicatedMapMessageType.REPLICATEDMAP_CLEAR = 0x0e09;
    ReplicatedMapMessageType.REPLICATEDMAP_ADDENTRYLISTENERTOKEYWITHPREDICATE = 0x0e0a;
    ReplicatedMapMessageType.REPLICATEDMAP_ADDENTRYLISTENERWITHPREDICATE = 0x0e0b;
    ReplicatedMapMessageType.REPLICATEDMAP_ADDENTRYLISTENERTOKEY = 0x0e0c;
    ReplicatedMapMessageType.REPLICATEDMAP_ADDENTRYLISTENER = 0x0e0d;
    ReplicatedMapMessageType.REPLICATEDMAP_REMOVEENTRYLISTENER = 0x0e0e;
    ReplicatedMapMessageType.REPLICATEDMAP_KEYSET = 0x0e0f;
    ReplicatedMapMessageType.REPLICATEDMAP_VALUES = 0x0e10;
    ReplicatedMapMessageType.REPLICATEDMAP_ENTRYSET = 0x0e11;
    ReplicatedMapMessageType.REPLICATEDMAP_ADDNEARCACHEENTRYLISTENER = 0x0e12;
    return ReplicatedMapMessageType;
}());
exports.ReplicatedMapMessageType = ReplicatedMapMessageType;

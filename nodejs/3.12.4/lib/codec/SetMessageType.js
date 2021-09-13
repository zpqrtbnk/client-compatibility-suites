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
var SetMessageType = /** @class */ (function () {
    function SetMessageType() {
    }
    SetMessageType.SET_SIZE = 0x0601;
    SetMessageType.SET_CONTAINS = 0x0602;
    SetMessageType.SET_CONTAINSALL = 0x0603;
    SetMessageType.SET_ADD = 0x0604;
    SetMessageType.SET_REMOVE = 0x0605;
    SetMessageType.SET_ADDALL = 0x0606;
    SetMessageType.SET_COMPAREANDREMOVEALL = 0x0607;
    SetMessageType.SET_COMPAREANDRETAINALL = 0x0608;
    SetMessageType.SET_CLEAR = 0x0609;
    SetMessageType.SET_GETALL = 0x060a;
    SetMessageType.SET_ADDLISTENER = 0x060b;
    SetMessageType.SET_REMOVELISTENER = 0x060c;
    SetMessageType.SET_ISEMPTY = 0x060d;
    return SetMessageType;
}());
exports.SetMessageType = SetMessageType;

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
var ClientMessageType = /** @class */ (function () {
    function ClientMessageType() {
    }
    ClientMessageType.CLIENT_AUTHENTICATION = 0x0002;
    ClientMessageType.CLIENT_AUTHENTICATIONCUSTOM = 0x0003;
    ClientMessageType.CLIENT_ADDMEMBERSHIPLISTENER = 0x0004;
    ClientMessageType.CLIENT_CREATEPROXY = 0x0005;
    ClientMessageType.CLIENT_DESTROYPROXY = 0x0006;
    ClientMessageType.CLIENT_GETPARTITIONS = 0x0008;
    ClientMessageType.CLIENT_REMOVEALLLISTENERS = 0x0009;
    ClientMessageType.CLIENT_ADDPARTITIONLOSTLISTENER = 0x000a;
    ClientMessageType.CLIENT_REMOVEPARTITIONLOSTLISTENER = 0x000b;
    ClientMessageType.CLIENT_GETDISTRIBUTEDOBJECTS = 0x000c;
    ClientMessageType.CLIENT_ADDDISTRIBUTEDOBJECTLISTENER = 0x000d;
    ClientMessageType.CLIENT_REMOVEDISTRIBUTEDOBJECTLISTENER = 0x000e;
    ClientMessageType.CLIENT_PING = 0x000f;
    ClientMessageType.CLIENT_STATISTICS = 0x0010;
    ClientMessageType.CLIENT_DEPLOYCLASSES = 0x0011;
    ClientMessageType.CLIENT_ADDPARTITIONLISTENER = 0x0012;
    return ClientMessageType;
}());
exports.ClientMessageType = ClientMessageType;
//# sourceMappingURL=ClientMessageType.js.map
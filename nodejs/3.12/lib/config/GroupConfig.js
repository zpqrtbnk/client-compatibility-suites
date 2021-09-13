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
/**
 * Group configuration of the cluster that this client connects.
 * A client will connect to only the cluster with these properties.
 */
var GroupConfig = /** @class */ (function () {
    function GroupConfig() {
        /**
         * Cluster group name.
         */
        this.name = 'dev';
        /**
         * Cluster group password.
         */
        this.password = 'dev-pass';
    }
    return GroupConfig;
}());
exports.GroupConfig = GroupConfig;
//# sourceMappingURL=GroupConfig.js.map
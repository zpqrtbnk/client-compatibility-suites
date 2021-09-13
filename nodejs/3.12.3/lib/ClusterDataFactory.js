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
var Address = require("./Address");
var ClusterDataFactoryHelper_1 = require("./ClusterDataFactoryHelper");
var ClusterDataFactory = /** @class */ (function () {
    function ClusterDataFactory() {
    }
    ClusterDataFactory.prototype.create = function (type) {
        if (type === ClusterDataFactoryHelper_1.ClusterDataFactoryHelper.ADDRESS_ID) {
            return new Address();
        }
        return null;
    };
    return ClusterDataFactory;
}());
exports.ClusterDataFactory = ClusterDataFactory;
//# sourceMappingURL=ClusterDataFactory.js.map
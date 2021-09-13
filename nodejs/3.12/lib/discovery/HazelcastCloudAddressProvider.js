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
var HazelcastCloudDiscovery_1 = require("./HazelcastCloudDiscovery");
var HazelcastCloudAddressProvider = /** @class */ (function () {
    function HazelcastCloudAddressProvider(endpointUrl, connectionTimeoutMillis, logger) {
        this.cloudDiscovery = new HazelcastCloudDiscovery_1.HazelcastCloudDiscovery(endpointUrl, connectionTimeoutMillis);
        this.logger = logger;
    }
    HazelcastCloudAddressProvider.prototype.loadAddresses = function () {
        var _this = this;
        return this.cloudDiscovery.discoverNodes().then(function (res) {
            return Array.from(res.keys());
        }).catch(function (e) {
            _this.logger.warn('HazelcastCloudAddressProvider', 'Failed to load addresses from hazelcast.cloud : ' + e.message);
            return [];
        });
    };
    return HazelcastCloudAddressProvider;
}());
exports.HazelcastCloudAddressProvider = HazelcastCloudAddressProvider;
//# sourceMappingURL=HazelcastCloudAddressProvider.js.map
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
var Promise = require("bluebird");
var fs = require("fs");
var Path = require("path");
var LoggingService_1 = require("../logging/LoggingService");
var Util_1 = require("../Util");
var DefaultLogger_1 = require("../logging/DefaultLogger");
var JsonConfigLocator = /** @class */ (function () {
    function JsonConfigLocator() {
        this.logger = new DefaultLogger_1.DefaultLogger(LoggingService_1.LogLevel.INFO);
    }
    JsonConfigLocator.prototype.load = function () {
        var _this = this;
        return this.loadFromEnvironment().then(function (loaded) {
            if (loaded) {
                return;
            }
            // tslint:disable-next-line
            return _this.loadFromWorkingDirectory().then(function (loaded) {
                if (loaded) {
                    return;
                }
            });
        });
    };
    JsonConfigLocator.prototype.loadFromEnvironment = function () {
        var _this = this;
        var envVariableLocation = process.env[JsonConfigLocator.ENV_VARIABLE_NAME];
        if (envVariableLocation) {
            var loadLocation = Path.resolve(envVariableLocation);
            this.logger.trace('ConfigBuilder', 'Loading config from ' + envVariableLocation);
            return this.loadPath(envVariableLocation).then(function (buffer) {
                _this.configLocation = envVariableLocation;
                _this.buffer = buffer;
                return true;
            });
        }
        else {
            return Promise.resolve(false);
        }
    };
    JsonConfigLocator.prototype.loadFromWorkingDirectory = function () {
        var _this = this;
        var cwd = process.cwd();
        var jsonPath = Path.resolve(cwd, JsonConfigLocator.DEFAULT_FILE_NAME);
        var deferred = Util_1.DeferredPromise();
        fs.access(jsonPath, function (err) {
            if (err) {
                deferred.resolve(false);
            }
            else {
                _this.loadPath(jsonPath).then(function (buffer) {
                    _this.buffer = buffer;
                    _this.configLocation = jsonPath;
                    deferred.resolve(true);
                }).catch(function (e) {
                    deferred.reject(e);
                });
            }
        });
        return deferred.promise;
    };
    JsonConfigLocator.prototype.loadImported = function (path) {
        return this.loadPath(Path.resolve(Path.dirname(this.configLocation), path));
    };
    JsonConfigLocator.prototype.loadPath = function (path) {
        var _this = this;
        var deferred = Util_1.DeferredPromise();
        fs.readFile(path, function (err, data) {
            if (err) {
                _this.logger.trace('JsonConfigLocator', 'Cannot read from ' + path.toString());
                deferred.reject(err);
            }
            else {
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    };
    JsonConfigLocator.prototype.getBuffer = function () {
        return this.buffer;
    };
    JsonConfigLocator.ENV_VARIABLE_NAME = 'HAZELCAST_CLIENT_CONFIG';
    JsonConfigLocator.DEFAULT_FILE_NAME = 'hazelcast-client.json';
    return JsonConfigLocator;
}());
exports.JsonConfigLocator = JsonConfigLocator;
//# sourceMappingURL=JsonConfigLocator.js.map
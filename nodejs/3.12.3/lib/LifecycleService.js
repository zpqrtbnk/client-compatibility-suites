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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var Util = require("./Util");
/**
 * Lifecycle events.
 */
exports.LifecycleEvent = {
    /**
     * events are emitted with this name.
     */
    name: 'lifecycleEvent',
    /**
     * From creation of client to connected state.
     */
    starting: 'starting',
    /**
     * Client is connected to cluster. Ready to use.
     */
    started: 'started',
    /**
     * Disconnect initiated.
     */
    shuttingDown: 'shuttingDown',
    /**
     * Disconnect completed gracefully.
     */
    shutdown: 'shutdown',
};
/**
 * LifecycleService
 */
var LifecycleService = /** @class */ (function (_super) {
    __extends(LifecycleService, _super);
    function LifecycleService(client) {
        var _this = _super.call(this) || this;
        _this.setMaxListeners(0);
        _this.client = client;
        _this.logger = _this.client.getLoggingService().getLogger();
        var listeners = client.getConfig().listeners.lifecycle;
        listeners.forEach(function (listener) {
            _this.on(exports.LifecycleEvent.name, listener);
        });
        var listenerConfigs = client.getConfig().listenerConfigs;
        listenerConfigs.forEach(function (importConfig) {
            var path = importConfig.path;
            var exportedName = importConfig.exportedName;
            var listener = Util.loadNameFromPath(path, exportedName);
            _this.on(exports.LifecycleEvent.name, listener);
        });
        _this.emitLifecycleEvent(exports.LifecycleEvent.starting);
        return _this;
    }
    /**
     * Causes LifecycleService to emit given event to all registered listeners.
     * @param state
     */
    LifecycleService.prototype.emitLifecycleEvent = function (state) {
        if (!exports.LifecycleEvent.hasOwnProperty(state)) {
            throw new Error(state + ' is not a valid lifecycle event');
        }
        if (state === exports.LifecycleEvent.started) {
            this.active = true;
        }
        else if (state === exports.LifecycleEvent.shuttingDown) {
            this.active = false;
        }
        this.logger.info('LifecycleService', 'HazelcastClient is ' + state);
        this.emit(exports.LifecycleEvent.name, state);
    };
    /**
     * Returns the active state of the client.
     * @returns {boolean}
     */
    LifecycleService.prototype.isRunning = function () {
        return this.active;
    };
    return LifecycleService;
}(events_1.EventEmitter));
exports.LifecycleService = LifecycleService;
//# sourceMappingURL=LifecycleService.js.map
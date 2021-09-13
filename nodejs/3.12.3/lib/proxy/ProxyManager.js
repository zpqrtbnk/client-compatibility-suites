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
var ClientAddDistributedObjectListenerCodec_1 = require("../codec/ClientAddDistributedObjectListenerCodec");
var ClientCreateProxyCodec_1 = require("../codec/ClientCreateProxyCodec");
var ClientDestroyProxyCodec_1 = require("../codec/ClientDestroyProxyCodec");
var ClientRemoveDistributedObjectListenerCodec_1 = require("../codec/ClientRemoveDistributedObjectListenerCodec");
var HazelcastError_1 = require("../HazelcastError");
var InvocationService_1 = require("../invocation/InvocationService");
var AtomicLongProxy_1 = require("./AtomicLongProxy");
var FlakeIdGeneratorProxy_1 = require("./FlakeIdGeneratorProxy");
var ListProxy_1 = require("./ListProxy");
var LockProxy_1 = require("./LockProxy");
var MapProxy_1 = require("./MapProxy");
var MultiMapProxy_1 = require("./MultiMapProxy");
var NearCachedMapProxy_1 = require("./NearCachedMapProxy");
var PNCounterProxy_1 = require("./PNCounterProxy");
var QueueProxy_1 = require("./QueueProxy");
var ReplicatedMapProxy_1 = require("./ReplicatedMapProxy");
var RingbufferProxy_1 = require("./ringbuffer/RingbufferProxy");
var SemaphoreProxy_1 = require("./SemaphoreProxy");
var SetProxy_1 = require("./SetProxy");
var ReliableTopicProxy_1 = require("./topic/ReliableTopicProxy");
var DistributedObjectListener_1 = require("../core/DistributedObjectListener");
var Util_1 = require("../Util");
var ProxyManager = /** @class */ (function () {
    function ProxyManager(client) {
        this.service = {};
        this.proxies = {};
        this.client = client;
        this.logger = this.client.getLoggingService().getLogger();
        this.invocationTimeoutMillis = this.client.getInvocationService().getInvocationTimeoutMillis();
        this.invocationRetryPauseMillis = this.client.getInvocationService().getInvocationRetryPauseMillis();
    }
    ProxyManager.prototype.init = function () {
        this.service[ProxyManager.MAP_SERVICE] = MapProxy_1.MapProxy;
        this.service[ProxyManager.SET_SERVICE] = SetProxy_1.SetProxy;
        this.service[ProxyManager.QUEUE_SERVICE] = QueueProxy_1.QueueProxy;
        this.service[ProxyManager.LIST_SERVICE] = ListProxy_1.ListProxy;
        this.service[ProxyManager.LOCK_SERVICE] = LockProxy_1.LockProxy;
        this.service[ProxyManager.MULTIMAP_SERVICE] = MultiMapProxy_1.MultiMapProxy;
        this.service[ProxyManager.RINGBUFFER_SERVICE] = RingbufferProxy_1.RingbufferProxy;
        this.service[ProxyManager.REPLICATEDMAP_SERVICE] = ReplicatedMapProxy_1.ReplicatedMapProxy;
        this.service[ProxyManager.SEMAPHORE_SERVICE] = SemaphoreProxy_1.SemaphoreProxy;
        this.service[ProxyManager.ATOMICLONG_SERVICE] = AtomicLongProxy_1.AtomicLongProxy;
        this.service[ProxyManager.FLAKEID_SERVICE] = FlakeIdGeneratorProxy_1.FlakeIdGeneratorProxy;
        this.service[ProxyManager.PNCOUNTER_SERVICE] = PNCounterProxy_1.PNCounterProxy;
        this.service[ProxyManager.RELIABLETOPIC_SERVICE] = ReliableTopicProxy_1.ReliableTopicProxy;
    };
    ProxyManager.prototype.getOrCreateProxy = function (name, serviceName, createAtServer) {
        var _this = this;
        if (createAtServer === void 0) { createAtServer = true; }
        var fullName = serviceName + name;
        if (this.proxies[fullName]) {
            return this.proxies[fullName];
        }
        var deferred = Util_1.DeferredPromise();
        var newProxy;
        if (serviceName === ProxyManager.MAP_SERVICE && this.client.getConfig().getNearCacheConfig(name)) {
            newProxy = new NearCachedMapProxy_1.NearCachedMapProxy(this.client, serviceName, name);
        }
        else if (serviceName === ProxyManager.RELIABLETOPIC_SERVICE) {
            newProxy = new ReliableTopicProxy_1.ReliableTopicProxy(this.client, serviceName, name);
            if (createAtServer) {
                newProxy.setRingbuffer().then(function () {
                    return _this.createProxy(newProxy);
                }).then(function () {
                    deferred.resolve(newProxy);
                });
            }
            this.proxies[fullName] = deferred.promise;
            return deferred.promise;
        }
        else {
            newProxy = new this.service[serviceName](this.client, serviceName, name);
        }
        if (createAtServer) {
            this.createProxy(newProxy).then(function () {
                deferred.resolve(newProxy);
            });
        }
        this.proxies[fullName] = deferred.promise;
        return deferred.promise;
    };
    ProxyManager.prototype.destroyProxy = function (name, serviceName) {
        delete this.proxies[serviceName + name];
        var clientMessage = ClientDestroyProxyCodec_1.ClientDestroyProxyCodec.encodeRequest(name, serviceName);
        clientMessage.setPartitionId(-1);
        return this.client.getInvocationService().invokeOnRandomTarget(clientMessage).return();
    };
    ProxyManager.prototype.addDistributedObjectListener = function (distributedObjectListener) {
        var handler = function (clientMessage) {
            var converterFunc = function (objectName, serviceName, eventType) {
                eventType = eventType.toLowerCase();
                var distributedObjectEvent = new DistributedObjectListener_1.DistributedObjectEvent(eventType, serviceName, objectName);
                distributedObjectListener(distributedObjectEvent);
            };
            ClientAddDistributedObjectListenerCodec_1.ClientAddDistributedObjectListenerCodec.handle(clientMessage, converterFunc, null);
        };
        var codec = this.createDistributedObjectListener();
        return this.client.getListenerService().registerListener(codec, handler);
    };
    ProxyManager.prototype.removeDistributedObjectListener = function (listenerId) {
        return this.client.getListenerService().deregisterListener(listenerId);
    };
    ProxyManager.prototype.isRetryable = function (error) {
        if (error instanceof HazelcastError_1.ClientNotActiveError) {
            return false;
        }
        return true;
    };
    ProxyManager.prototype.createProxy = function (proxyObject) {
        var promise = Util_1.DeferredPromise();
        this.initializeProxy(proxyObject, promise, Date.now() + this.invocationTimeoutMillis);
        return promise.promise;
    };
    ProxyManager.prototype.findNextAddress = function () {
        var members = this.client.getClusterService().getMembers();
        var liteMember = null;
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var member = members_1[_i];
            if (member != null && member.isLiteMember === false) {
                return member.address;
            }
            else if (member != null && member.isLiteMember) {
                liteMember = member;
            }
        }
        if (liteMember != null) {
            return liteMember.address;
        }
        else {
            return null;
        }
    };
    ProxyManager.prototype.initializeProxy = function (proxyObject, promise, deadline) {
        var _this = this;
        if (Date.now() <= deadline) {
            var address = this.findNextAddress();
            var request = ClientCreateProxyCodec_1.ClientCreateProxyCodec.encodeRequest(proxyObject.getName(), proxyObject.getServiceName(), address);
            var invocation = new InvocationService_1.Invocation(this.client, request);
            invocation.address = address;
            this.client.getInvocationService().invoke(invocation).then(function (response) {
                promise.resolve(response);
            }).catch(function (error) {
                if (_this.isRetryable(error)) {
                    _this.logger.warn('ProxyManager', 'Create proxy request for ' + proxyObject.getName() +
                        ' failed. Retrying in ' + _this.invocationRetryPauseMillis + 'ms. ' + error);
                    setTimeout(_this.initializeProxy.bind(_this, proxyObject, promise, deadline), _this.invocationRetryPauseMillis);
                }
                else {
                    _this.logger.warn('ProxyManager', 'Create proxy request for ' + proxyObject.getName() + ' failed ' + error);
                }
            });
        }
        else {
            promise.reject('Create proxy request timed-out for ' + proxyObject.getName());
        }
    };
    ProxyManager.prototype.createDistributedObjectListener = function () {
        return {
            encodeAddRequest: function (localOnly) {
                return ClientAddDistributedObjectListenerCodec_1.ClientAddDistributedObjectListenerCodec.encodeRequest(localOnly);
            },
            decodeAddResponse: function (msg) {
                return ClientAddDistributedObjectListenerCodec_1.ClientAddDistributedObjectListenerCodec.decodeResponse(msg).response;
            },
            encodeRemoveRequest: function (listenerId) {
                return ClientRemoveDistributedObjectListenerCodec_1.ClientRemoveDistributedObjectListenerCodec.encodeRequest(listenerId);
            },
        };
    };
    ProxyManager.MAP_SERVICE = 'hz:impl:mapService';
    ProxyManager.SET_SERVICE = 'hz:impl:setService';
    ProxyManager.LOCK_SERVICE = 'hz:impl:lockService';
    ProxyManager.QUEUE_SERVICE = 'hz:impl:queueService';
    ProxyManager.LIST_SERVICE = 'hz:impl:listService';
    ProxyManager.MULTIMAP_SERVICE = 'hz:impl:multiMapService';
    ProxyManager.RINGBUFFER_SERVICE = 'hz:impl:ringbufferService';
    ProxyManager.REPLICATEDMAP_SERVICE = 'hz:impl:replicatedMapService';
    ProxyManager.SEMAPHORE_SERVICE = 'hz:impl:semaphoreService';
    ProxyManager.ATOMICLONG_SERVICE = 'hz:impl:atomicLongService';
    ProxyManager.FLAKEID_SERVICE = 'hz:impl:flakeIdGeneratorService';
    ProxyManager.PNCOUNTER_SERVICE = 'hz:impl:PNCounterService';
    ProxyManager.RELIABLETOPIC_SERVICE = 'hz:impl:reliableTopicService';
    return ProxyManager;
}());
exports.ProxyManager = ProxyManager;
//# sourceMappingURL=ProxyManager.js.map
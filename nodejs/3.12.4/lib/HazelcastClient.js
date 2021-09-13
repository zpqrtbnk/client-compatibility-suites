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
var Promise = require("bluebird");
var ClientGetDistributedObjectsCodec_1 = require("./codec/ClientGetDistributedObjectsCodec");
var Config_1 = require("./config/Config");
var ConfigBuilder_1 = require("./config/ConfigBuilder");
var HeartbeatService_1 = require("./HeartbeatService");
var ClientConnectionManager_1 = require("./invocation/ClientConnectionManager");
var ClusterService_1 = require("./invocation/ClusterService");
var InvocationService_1 = require("./invocation/InvocationService");
var LifecycleService_1 = require("./LifecycleService");
var ListenerService_1 = require("./ListenerService");
var LockReferenceIdGenerator_1 = require("./LockReferenceIdGenerator");
var LoggingService_1 = require("./logging/LoggingService");
var RepairingTask_1 = require("./nearcache/RepairingTask");
var PartitionService_1 = require("./PartitionService");
var ErrorFactory_1 = require("./protocol/ErrorFactory");
var ProxyManager_1 = require("./proxy/ProxyManager");
var SerializationService_1 = require("./serialization/SerializationService");
var HazelcastCloudAddressProvider_1 = require("./discovery/HazelcastCloudAddressProvider");
var HazelcastCloudAddressTranslator_1 = require("./discovery/HazelcastCloudAddressTranslator");
var DefaultAddressTranslator_1 = require("./connection/DefaultAddressTranslator");
var DefaultAddressProvider_1 = require("./connection/DefaultAddressProvider");
var HazelcastCloudDiscovery_1 = require("./discovery/HazelcastCloudDiscovery");
var Statistics_1 = require("./statistics/Statistics");
var NearCacheManager_1 = require("./nearcache/NearCacheManager");
var HazelcastClient = /** @class */ (function () {
    function HazelcastClient(config) {
        this.id = HazelcastClient.CLIENT_ID++;
        this.config = new Config_1.ClientConfig();
        if (config) {
            this.config = config;
        }
        if (config.getInstanceName() != null) {
            this.instanceName = config.getInstanceName();
        }
        else {
            this.instanceName = 'hz.client_' + this.id;
        }
        this.loggingService = new LoggingService_1.LoggingService(this.config.customLogger, this.config.properties['hazelcast.logging.level']);
        this.invocationService = new InvocationService_1.InvocationService(this);
        this.listenerService = new ListenerService_1.ListenerService(this);
        this.serializationService = new SerializationService_1.SerializationServiceV1(this, this.config.serializationConfig);
        this.proxyManager = new ProxyManager_1.ProxyManager(this);
        this.nearCacheManager = new NearCacheManager_1.NearCacheManager(this);
        this.partitionService = new PartitionService_1.PartitionService(this);
        var addressProviders = this.createAddressProviders();
        var addressTranslator = this.createAddressTranslator();
        this.connectionManager = new ClientConnectionManager_1.ClientConnectionManager(this, addressTranslator, addressProviders);
        this.clusterService = new ClusterService_1.ClusterService(this);
        this.lifecycleService = new LifecycleService_1.LifecycleService(this);
        this.heartbeat = new HeartbeatService_1.Heartbeat(this);
        this.lockReferenceIdGenerator = new LockReferenceIdGenerator_1.LockReferenceIdGenerator();
        this.errorFactory = new ErrorFactory_1.ClientErrorFactory();
        this.statistics = new Statistics_1.Statistics(this);
    }
    /**
     * Creates a new client object and automatically connects to cluster.
     * @param config Default {@link ClientConfig} is used when this parameter is absent.
     * @returns a new client instance
     */
    HazelcastClient.newHazelcastClient = function (config) {
        if (config == null) {
            var configBuilder_1 = new ConfigBuilder_1.ConfigBuilder();
            return configBuilder_1.loadConfig().then(function () {
                var client = new HazelcastClient(configBuilder_1.build());
                return client.init();
            });
        }
        else {
            var client = new HazelcastClient(config);
            return client.init();
        }
    };
    /**
     * Returns the name of this Hazelcast instance.
     *
     * @return name of this Hazelcast instance
     */
    HazelcastClient.prototype.getName = function () {
        return this.instanceName;
    };
    /**
     * Gathers information of this local client.
     * @returns {ClientInfo}
     */
    HazelcastClient.prototype.getLocalEndpoint = function () {
        return this.clusterService.getClientInfo();
    };
    /**
     * Gives all known distributed objects in cluster.
     * @returns {Promise<DistributedObject[]>|Promise<T>}
     */
    HazelcastClient.prototype.getDistributedObjects = function () {
        var clientMessage = ClientGetDistributedObjectsCodec_1.ClientGetDistributedObjectsCodec.encodeRequest();
        var toObjectFunc = this.getSerializationService().toObject.bind(this);
        var proxyManager = this.proxyManager;
        return this.invocationService.invokeOnRandomTarget(clientMessage).then(function (resp) {
            var response = ClientGetDistributedObjectsCodec_1.ClientGetDistributedObjectsCodec.decodeResponse(resp, toObjectFunc).response;
            return Promise.all(response.map(function (objectInfo) {
                return proxyManager.getOrCreateProxy(objectInfo.value, objectInfo.key, false);
            }));
        });
    };
    /**
     * Returns the distributed map instance with given name.
     * @param name
     * @returns {Promise<IMap<K, V>>}
     */
    HazelcastClient.prototype.getMap = function (name) {
        return this.proxyManager.getOrCreateProxy(name, ProxyManager_1.ProxyManager.MAP_SERVICE);
    };
    /**
     * Returns the distributed set instance with given name.
     * @param name
     * @returns {Promise<ISet<E>>}
     */
    HazelcastClient.prototype.getSet = function (name) {
        return this.proxyManager.getOrCreateProxy(name, ProxyManager_1.ProxyManager.SET_SERVICE);
    };
    /**
     * Returns the distributed lock instance with given name.
     * @param name
     * @returns {Promise<ILock>}
     */
    HazelcastClient.prototype.getLock = function (name) {
        return this.proxyManager.getOrCreateProxy(name, ProxyManager_1.ProxyManager.LOCK_SERVICE);
    };
    /**
     * Returns the distributed queue instance with given name.
     * @param name
     * @returns {Promise<IQueue<E>>}
     */
    HazelcastClient.prototype.getQueue = function (name) {
        return this.proxyManager.getOrCreateProxy(name, ProxyManager_1.ProxyManager.QUEUE_SERVICE);
    };
    /**
     * Returns the distributed list instance with given name.
     * @param name
     * @returns {Promise<IList<E>>}
     */
    HazelcastClient.prototype.getList = function (name) {
        return this.proxyManager.getOrCreateProxy(name, ProxyManager_1.ProxyManager.LIST_SERVICE);
    };
    /**
     * Returns the distributed multi-map instance with given name.
     * @param name
     * @returns {Promise<MultiMap<K, V>>}
     */
    HazelcastClient.prototype.getMultiMap = function (name) {
        return this.proxyManager.getOrCreateProxy(name, ProxyManager_1.ProxyManager.MULTIMAP_SERVICE);
    };
    /**
     * Returns a distributed ringbuffer instance with the given name.
     * @param name
     * @returns {Promise<Ringbuffer<E>>}
     */
    HazelcastClient.prototype.getRingbuffer = function (name) {
        return this.proxyManager.getOrCreateProxy(name, ProxyManager_1.ProxyManager.RINGBUFFER_SERVICE);
    };
    /**
     * Returns a distributed reliable topic instance with the given name.
     * @param name
     * @returns {Promise<ITopic<E>>}
     */
    HazelcastClient.prototype.getReliableTopic = function (name) {
        return this.proxyManager.getOrCreateProxy(name, ProxyManager_1.ProxyManager.RELIABLETOPIC_SERVICE);
    };
    /**
     * Returns the distributed replicated-map instance with given name.
     * @param name
     * @returns {Promise<ReplicatedMap<K, V>>}
     */
    HazelcastClient.prototype.getReplicatedMap = function (name) {
        return this.proxyManager.getOrCreateProxy(name, ProxyManager_1.ProxyManager.REPLICATEDMAP_SERVICE);
    };
    /**
     * Returns the distributed atomic long instance with given name.
     * @param name
     * @returns {Promise<IAtomicLong>}
     */
    HazelcastClient.prototype.getAtomicLong = function (name) {
        return this.proxyManager.getOrCreateProxy(name, ProxyManager_1.ProxyManager.ATOMICLONG_SERVICE);
    };
    /**
     * Returns the distributed flake ID generator instance with given name.
     * @param name
     * @returns {Promise<FlakeIdGenerator>}
     */
    HazelcastClient.prototype.getFlakeIdGenerator = function (name) {
        return this.proxyManager.getOrCreateProxy(name, ProxyManager_1.ProxyManager.FLAKEID_SERVICE);
    };
    /**
     * Returns the distributed PN Counter instance with given name.
     * @param name
     * @returns {Promise<PNCounter>}
     */
    HazelcastClient.prototype.getPNCounter = function (name) {
        return this.proxyManager.getOrCreateProxy(name, ProxyManager_1.ProxyManager.PNCOUNTER_SERVICE);
    };
    /**
     * Returns the distributed semaphore instance with given name.
     * @param name
     * @returns {Promise<ISemaphore>}
     */
    HazelcastClient.prototype.getSemaphore = function (name) {
        return this.proxyManager.getOrCreateProxy(name, ProxyManager_1.ProxyManager.SEMAPHORE_SERVICE);
    };
    /**
     * Return configuration that this instance started with.
     * Returned configuration object should not be modified.
     * @returns {ClientConfig}
     */
    HazelcastClient.prototype.getConfig = function () {
        return this.config;
    };
    HazelcastClient.prototype.getSerializationService = function () {
        return this.serializationService;
    };
    HazelcastClient.prototype.getInvocationService = function () {
        return this.invocationService;
    };
    HazelcastClient.prototype.getListenerService = function () {
        return this.listenerService;
    };
    HazelcastClient.prototype.getConnectionManager = function () {
        return this.connectionManager;
    };
    HazelcastClient.prototype.getPartitionService = function () {
        return this.partitionService;
    };
    HazelcastClient.prototype.getProxyManager = function () {
        return this.proxyManager;
    };
    HazelcastClient.prototype.getNearCacheManager = function () {
        return this.nearCacheManager;
    };
    HazelcastClient.prototype.getClusterService = function () {
        return this.clusterService;
    };
    HazelcastClient.prototype.getHeartbeat = function () {
        return this.heartbeat;
    };
    HazelcastClient.prototype.getLifecycleService = function () {
        return this.lifecycleService;
    };
    HazelcastClient.prototype.getRepairingTask = function () {
        if (this.mapRepairingTask == null) {
            this.mapRepairingTask = new RepairingTask_1.RepairingTask(this);
        }
        return this.mapRepairingTask;
    };
    HazelcastClient.prototype.getLoggingService = function () {
        return this.loggingService;
    };
    /**
     * Registers a distributed object listener to cluster.
     * @param listenerFunc Callback function will be called with following arguments.
     * <ul>
     *     <li>service name</li>
     *     <li>distributed object name</li>
     *     <li>name of the event that happened: either 'created' or 'destroyed'</li>
     * </ul>
     * @returns registration id of the listener.
     */
    HazelcastClient.prototype.addDistributedObjectListener = function (distributedObjectListener) {
        return this.proxyManager.addDistributedObjectListener(distributedObjectListener);
    };
    /**
     * Removes a distributed object listener from cluster.
     * @param listenerId id of the listener to be removed.
     * @returns `true` if registration is removed, `false` otherwise.
     */
    HazelcastClient.prototype.removeDistributedObjectListener = function (listenerId) {
        return this.proxyManager.removeDistributedObjectListener(listenerId);
    };
    HazelcastClient.prototype.getLockReferenceIdGenerator = function () {
        return this.lockReferenceIdGenerator;
    };
    HazelcastClient.prototype.getErrorFactory = function () {
        return this.errorFactory;
    };
    /**
     * Shuts down this client instance.
     */
    HazelcastClient.prototype.shutdown = function () {
        this.lifecycleService.emitLifecycleEvent(LifecycleService_1.LifecycleEvent.shuttingDown);
        if (this.mapRepairingTask !== undefined) {
            this.mapRepairingTask.shutdown();
        }
        this.nearCacheManager.destroyAllNearCaches();
        this.statistics.stop();
        this.partitionService.shutdown();
        this.heartbeat.cancel();
        this.connectionManager.shutdown();
        this.listenerService.shutdown();
        this.invocationService.shutdown();
        this.lifecycleService.emitLifecycleEvent(LifecycleService_1.LifecycleEvent.shutdown);
    };
    HazelcastClient.prototype.init = function () {
        var _this = this;
        return this.clusterService.start().then(function () {
            return _this.partitionService.initialize();
        }).then(function () {
            return _this.heartbeat.start();
        }).then(function () {
            _this.lifecycleService.emitLifecycleEvent(LifecycleService_1.LifecycleEvent.started);
        }).then(function () {
            _this.proxyManager.init();
            _this.listenerService.start();
            _this.invocationService.start();
            _this.statistics.start();
            return _this;
        }).catch(function (e) {
            _this.loggingService.getLogger().error('HazelcastClient', 'Client failed to start', e);
            throw e;
        });
    };
    HazelcastClient.prototype.createAddressTranslator = function () {
        var cloudConfig = this.getConfig().networkConfig.cloudConfig;
        if (cloudConfig.enabled) {
            var urlEndpoint = HazelcastCloudDiscovery_1.HazelcastCloudDiscovery.createUrlEndpoint(this.getConfig().properties, cloudConfig.discoveryToken);
            return new HazelcastCloudAddressTranslator_1.HazelcastCloudAddressTranslator(urlEndpoint, this.getConnectionTimeoutMillis(), this.loggingService.getLogger());
        }
        return new DefaultAddressTranslator_1.DefaultAddressTranslator();
    };
    HazelcastClient.prototype.createAddressProviders = function () {
        var networkConfig = this.getConfig().networkConfig;
        var addressProviders = [];
        var cloudAddressProvider = this.initCloudAddressProvider();
        if (cloudAddressProvider != null) {
            addressProviders.push(cloudAddressProvider);
        }
        addressProviders.push(new DefaultAddressProvider_1.DefaultAddressProvider(networkConfig, addressProviders.length === 0));
        return addressProviders;
    };
    HazelcastClient.prototype.initCloudAddressProvider = function () {
        var cloudConfig = this.getConfig().networkConfig.cloudConfig;
        if (cloudConfig.enabled) {
            var discoveryToken = cloudConfig.discoveryToken;
            var urlEndpoint = HazelcastCloudDiscovery_1.HazelcastCloudDiscovery.createUrlEndpoint(this.getConfig().properties, discoveryToken);
            return new HazelcastCloudAddressProvider_1.HazelcastCloudAddressProvider(urlEndpoint, this.getConnectionTimeoutMillis(), this.loggingService.getLogger());
        }
        return null;
    };
    HazelcastClient.prototype.getConnectionTimeoutMillis = function () {
        var networkConfig = this.getConfig().networkConfig;
        var connTimeout = networkConfig.connectionTimeout;
        return connTimeout === 0 ? Number.MAX_VALUE : connTimeout;
    };
    HazelcastClient.CLIENT_ID = 0;
    return HazelcastClient;
}());
exports.default = HazelcastClient;

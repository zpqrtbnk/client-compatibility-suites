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
var ClientAuthenticationCodec_1 = require("../codec/ClientAuthenticationCodec");
var ClientAuthenticationCustomCodec_1 = require("../codec/ClientAuthenticationCustomCodec");
var HazelcastError_1 = require("../HazelcastError");
var BuildInfo_1 = require("../BuildInfo");
var AuthenticationStatus;
(function (AuthenticationStatus) {
    AuthenticationStatus[AuthenticationStatus["AUTHENTICATED"] = 0] = "AUTHENTICATED";
    AuthenticationStatus[AuthenticationStatus["CREDENTIALS_FAILED"] = 1] = "CREDENTIALS_FAILED";
    AuthenticationStatus[AuthenticationStatus["SERIALIZATION_VERSION_MISMATCH"] = 2] = "SERIALIZATION_VERSION_MISMATCH";
})(AuthenticationStatus || (AuthenticationStatus = {}));
var ConnectionAuthenticator = /** @class */ (function () {
    function ConnectionAuthenticator(connection, client) {
        this.connection = connection;
        this.client = client;
        this.logger = this.client.getLoggingService().getLogger();
        this.clusterService = this.client.getClusterService();
    }
    ConnectionAuthenticator.prototype.authenticate = function (asOwner) {
        var _this = this;
        var credentials = this.createCredentials(asOwner);
        return this.client.getInvocationService()
            .invokeOnConnection(this.connection, credentials)
            .then(function (msg) {
            var authResponse = ClientAuthenticationCodec_1.ClientAuthenticationCodec.decodeResponse(msg);
            switch (authResponse.status) {
                case 0 /* AUTHENTICATED */:
                    _this.connection.setAddress(authResponse.address);
                    _this.connection.setConnectedServerVersion(authResponse.serverHazelcastVersion);
                    if (asOwner) {
                        _this.clusterService.uuid = authResponse.uuid;
                        _this.clusterService.ownerUuid = authResponse.ownerUuid;
                    }
                    _this.logger.info('ConnectionAuthenticator', 'Connection to ' +
                        _this.connection.getAddress().toString() + ' authenticated');
                    break;
                case 1 /* CREDENTIALS_FAILED */:
                    _this.logger.error('ConnectionAuthenticator', 'Invalid Credentials');
                    throw new Error('Invalid Credentials, could not authenticate connection to ' +
                        _this.connection.getAddress().toString());
                case 2 /* SERIALIZATION_VERSION_MISMATCH */:
                    _this.logger.error('ConnectionAuthenticator', 'Serialization version mismatch');
                    throw new Error('Serialization version mismatch, could not authenticate connection to ' +
                        _this.connection.getAddress().toString());
                default:
                    _this.logger.error('ConnectionAuthenticator', 'Unknown authentication status: '
                        + authResponse.status);
                    throw new HazelcastError_1.AuthenticationError('Unknown authentication status: ' + authResponse.status +
                        ' , could not authenticate connection to ' +
                        _this.connection.getAddress().toString());
            }
        });
    };
    ConnectionAuthenticator.prototype.createCredentials = function (asOwner) {
        var groupConfig = this.client.getConfig().groupConfig;
        var uuid = this.clusterService.uuid;
        var ownerUuid = this.clusterService.ownerUuid;
        var customCredentials = this.client.getConfig().customCredentials;
        var clientMessage;
        var clientVersion = BuildInfo_1.BuildInfo.getClientVersion();
        if (customCredentials != null) {
            var credentialsPayload = this.client.getSerializationService().toData(customCredentials);
            clientMessage = ClientAuthenticationCustomCodec_1.ClientAuthenticationCustomCodec.encodeRequest(credentialsPayload, uuid, ownerUuid, asOwner, 'NJS', 1, clientVersion);
        }
        else {
            clientMessage = ClientAuthenticationCodec_1.ClientAuthenticationCodec.encodeRequest(groupConfig.name, groupConfig.password, uuid, ownerUuid, asOwner, 'NJS', 1, clientVersion);
        }
        return clientMessage;
    };
    return ConnectionAuthenticator;
}());
exports.ConnectionAuthenticator = ConnectionAuthenticator;
//# sourceMappingURL=ConnectionAuthenticator.js.map
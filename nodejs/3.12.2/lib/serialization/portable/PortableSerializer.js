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
var PortableContext_1 = require("./PortableContext");
var DefaultPortableReader_1 = require("./DefaultPortableReader");
var MorphingPortableReader_1 = require("./MorphingPortableReader");
var DefaultPortableWriter_1 = require("./DefaultPortableWriter");
var HazelcastError_1 = require("../../HazelcastError");
var Util = require("../../Util");
var PortableSerializer = /** @class */ (function () {
    function PortableSerializer(service, serializationConfig) {
        this.service = service;
        this.portableContext = new PortableContext_1.PortableContext(this.service, serializationConfig.portableVersion);
        this.factories = serializationConfig.portableFactories;
        var factoryConfigs = serializationConfig.portableFactoryConfigs;
        for (var id in factoryConfigs) {
            var exportedName = factoryConfigs[id].exportedName;
            var path = factoryConfigs[id].path;
            var factoryConstructor = Util.loadNameFromPath(path, exportedName);
            this.factories[id] = new factoryConstructor();
        }
    }
    PortableSerializer.prototype.getId = function () {
        return -1;
    };
    PortableSerializer.prototype.read = function (input) {
        var factoryId = input.readInt();
        var classId = input.readInt();
        return this.readObject(input, factoryId, classId);
    };
    PortableSerializer.prototype.readObject = function (input, factoryId, classId) {
        var version = input.readInt();
        var portable = this.createNewPortableInstance(factoryId, classId);
        var classDefinition = this.portableContext.lookupClassDefinition(factoryId, classId, version);
        if (classDefinition == null) {
            var backupPos = input.position();
            try {
                classDefinition = this.portableContext.readClassDefinitionFromInput(input, factoryId, classId, version);
            }
            finally {
                input.position(backupPos);
            }
        }
        var reader;
        if (classDefinition.getVersion() === this.portableContext.getClassVersion(portable)) {
            reader = new DefaultPortableReader_1.DefaultPortableReader(this, input, classDefinition);
        }
        else {
            reader = new MorphingPortableReader_1.MorphingPortableReader(this, input, classDefinition);
        }
        portable.readPortable(reader);
        reader.end();
        return portable;
    };
    PortableSerializer.prototype.write = function (output, object) {
        output.writeInt(object.getFactoryId());
        output.writeInt(object.getClassId());
        this.writeObject(output, object);
    };
    PortableSerializer.prototype.writeObject = function (output, object) {
        var cd = this.portableContext.lookupOrRegisterClassDefinition(object);
        output.writeInt(cd.getVersion());
        var writer = new DefaultPortableWriter_1.DefaultPortableWriter(this, output, cd);
        object.writePortable(writer);
        writer.end();
    };
    PortableSerializer.prototype.createNewPortableInstance = function (factoryId, classId) {
        var factory = this.factories[factoryId];
        if (factory == null) {
            throw new HazelcastError_1.HazelcastSerializationError("There is no suitable portable factory for " + factoryId + ".");
        }
        var portable = factory.create(classId);
        if (portable == null) {
            throw new HazelcastError_1.HazelcastSerializationError("Could not create Portable for class-id: " + classId);
        }
        return portable;
    };
    return PortableSerializer;
}());
exports.PortableSerializer = PortableSerializer;
//# sourceMappingURL=PortableSerializer.js.map
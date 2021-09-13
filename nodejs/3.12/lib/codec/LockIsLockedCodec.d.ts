import ClientMessage = require('../ClientMessage');
import { Data } from '../serialization/Data';
export declare class LockIsLockedCodec {
    static calculateSize(name: string): number;
    static encodeRequest(name: string): ClientMessage;
    static decodeResponse(clientMessage: ClientMessage, toObjectFunction?: (data: Data) => any): any;
}

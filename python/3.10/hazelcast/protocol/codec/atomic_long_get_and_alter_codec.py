from hazelcast.serialization.bits import *
from hazelcast.protocol.client_message import ClientMessage
from hazelcast.protocol.codec.atomic_long_message_type import *

REQUEST_TYPE = ATOMICLONG_GETANDALTER
RESPONSE_TYPE = 103
RETRYABLE = False


def calculate_size(name, function):
    """ Calculates the request payload size"""
    data_size = 0
    data_size += calculate_size_str(name)
    data_size += calculate_size_data(function)
    return data_size


def encode_request(name, function):
    """ Encode request into client_message"""
    client_message = ClientMessage(payload_size=calculate_size(name, function))
    client_message.set_message_type(REQUEST_TYPE)
    client_message.set_retryable(RETRYABLE)
    client_message.append_str(name)
    client_message.append_data(function)
    client_message.update_frame_length()
    return client_message


def decode_response(client_message, to_object=None):
    """ Decode response from client message"""
    parameters = dict(response=None)
    parameters['response'] = client_message.read_long()
    return parameters

import {
    zFromInstructionAsParameter,
    zFromInstructionObjectParameter,
    zFromInstructionParameters,
    zFromInstructionStringFromParameter
} from './schema'
import {
    type FromInstructionParameterObject,
    type FromInstructionParameters,
    type FromInstructionStringFromParameter
} from './types'

export const isFromInstructionStringFromParameter = (value: unknown): value is FromInstructionStringFromParameter =>
    zFromInstructionStringFromParameter.safeParse(value).success

export const isFromInstructionParameters = (value: unknown): value is FromInstructionParameters =>
    zFromInstructionParameters.safeParse(value).success

export const isFromInstructionParameterObject = (value: unknown): value is FromInstructionParameterObject =>
    zFromInstructionObjectParameter.safeParse(value).success

export const isFromInstructionAsParameter = (value: unknown): value is string =>
    zFromInstructionAsParameter.safeParse(value).success

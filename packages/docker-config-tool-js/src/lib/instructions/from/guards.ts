import {
    zFromInstructionAsParam,
    zFromInstructionObjectParam,
    zFromInstructionParams,
    zFromInstructionStringFromParam
} from './schema'
import {
    type FromInstructionParamObject,
    type FromInstructionParams,
    type FromInstructionStringFromParam
} from './types'

export const isFromInstructionStringFromParam = (value: unknown): value is FromInstructionStringFromParam =>
    zFromInstructionStringFromParam.safeParse(value).success

export const isFromInstructionParams = (value: unknown): value is FromInstructionParams =>
    zFromInstructionParams.safeParse(value).success

export const isFromInstructionParamObject = (value: unknown): value is FromInstructionParamObject =>
    zFromInstructionObjectParam.safeParse(value).success

export const isFromInstructionAsParam = (value: unknown): value is string =>
    zFromInstructionAsParam.safeParse(value).success

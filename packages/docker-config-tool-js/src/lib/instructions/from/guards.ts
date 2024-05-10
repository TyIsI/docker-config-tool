import { zFromInstructionAsParam, zFromInstructionObjectParam, zFromInstructionParams } from './schema'
import { type FromInstructionObjectParam, type FromInstructionParams } from './types'

export const isFromInstructionParams = (value: unknown): value is FromInstructionParams =>
    zFromInstructionParams.safeParse(value).success

export const isFromInstructionObjectParam = (value: unknown): value is FromInstructionObjectParam =>
    zFromInstructionObjectParam.safeParse(value).success

export const isFromInstructionAsParam = (value: unknown): value is string =>
    zFromInstructionAsParam.safeParse(value).success

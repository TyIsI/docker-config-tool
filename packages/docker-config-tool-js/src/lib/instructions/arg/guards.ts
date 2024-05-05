import { zArgInstructionParams, zArgInstructionParamsObject } from './schema'
import { type ArgInstructionParams, type ArgInstructionParamsObject } from './types'

export const isArgInstructionParamObject = (value: unknown): value is ArgInstructionParamsObject => {
    return zArgInstructionParamsObject.safeParse(value).success
}

export const isArgInstructionParams = (value: unknown): value is ArgInstructionParams =>
    zArgInstructionParams.safeParse(value).success

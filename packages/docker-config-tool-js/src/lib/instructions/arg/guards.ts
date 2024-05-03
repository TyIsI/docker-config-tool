import { zArgInstructionParameters, zArgInstructionParametersObject } from './schema'
import { type ArgInstructionParameters, type ArgInstructionParametersObject } from './types'

export const isArgInstructionParameterObject = (value: unknown): value is ArgInstructionParametersObject => {
    return zArgInstructionParametersObject.safeParse(value).success
}

export const isArgInstructionParameters = (value: unknown): value is ArgInstructionParameters =>
    zArgInstructionParameters.safeParse(value).success

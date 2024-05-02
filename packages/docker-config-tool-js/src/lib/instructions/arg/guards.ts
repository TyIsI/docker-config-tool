import { zArgInstructionParametersObject, zArgInstructionParameters } from './schema'
import { type ArgInstructionParametersObject, type ArgInstructionParameters } from './types'

export const isArgInstructionParameterObject = (value: unknown): value is ArgInstructionParametersObject => {
    return zArgInstructionParametersObject.safeParse(value).success
}

export const isArgInstructionParameters = (value: unknown): value is ArgInstructionParameters =>
    zArgInstructionParameters.safeParse(value).success

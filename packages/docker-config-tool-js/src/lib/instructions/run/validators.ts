import { type ResultTuple } from '../../shared/types'
import { reduceZodErrors } from '../../shared/utils'
import { zRunInstructionParameters } from './schema'
import { type RunInstructionParameters } from './types'

export const validateRunInstructionParameters = (
    value: RunInstructionParameters
): ResultTuple<RunInstructionParameters> => {
    const result = zRunInstructionParameters.safeParse(value)

    return result.success ? [true, value] : [false, reduceZodErrors(result.error)]
}

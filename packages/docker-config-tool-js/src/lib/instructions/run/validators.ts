import { type ResultTuple } from '../../shared/types'
import { reduceZodErrors } from '../../shared/utils'
import { zRunInstructionParams } from './schema'
import { type RunInstructionParams } from './types'

export const validateRunInstructionParams = (value: RunInstructionParams): ResultTuple<RunInstructionParams> => {
    const result = zRunInstructionParams.safeParse(value)

    return result.success ? [true, value] : [false, reduceZodErrors(result.error)]
}

import { type ResultTuple } from '../../shared/types'
import { reduceZodErrors } from '../../shared/utils'
import { zAddInstructionParams } from './schema'
import { type AddInstructionParams } from './types'

export const validateAddInstructionParams = (value: AddInstructionParams): ResultTuple<AddInstructionParams> => {
    const result = zAddInstructionParams.safeParse(value)

    return result.success ? [true, value] : [false, reduceZodErrors(result.error)]
}

import { type ResultTuple } from '../../shared/types'
import { reduceZodErrors } from '../../shared/utils'
import { zUserInstructionParams } from './schema'
import { type UserInstructionParams } from './types'

export const validateUserInstructionParams = (value: UserInstructionParams): ResultTuple<UserInstructionParams> => {
    const result = zUserInstructionParams.safeParse(value)

    return result.success ? [true, value] : [false, reduceZodErrors(result.error)]
}

import { type ResultTuple } from '../../shared/types'
import { reduceZodErrors } from '../../shared/utils'
import { zUserInstructionParameters } from './schema'
import { type UserInstructionParameters } from './types'

export const validateUserInstructionParameters = (
    value: UserInstructionParameters
): ResultTuple<UserInstructionParameters> => {
    const result = zUserInstructionParameters.safeParse(value)

    return result.success ? [true, value] : [false, reduceZodErrors(result.error)]
}

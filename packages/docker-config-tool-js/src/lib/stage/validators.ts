import { type ResultTuple } from '../shared/types'
import { reduceZodErrors } from '../shared/utils'
import { zStageConstructorParams } from './schema'
import { type StageConstructorParams } from './types'

export const validStageConstructorParams = (value: StageConstructorParams): ResultTuple<StageConstructorParams> => {
    const result = zStageConstructorParams.safeParse(value)

    return result.success ? [true, value] : [false, reduceZodErrors(result.error)]
}

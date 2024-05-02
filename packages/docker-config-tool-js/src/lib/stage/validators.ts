import { type ResultTuple } from '../shared/types'
import { reduceZodErrors } from '../shared/utils'
import { zStageConstructorArgs } from './schema'
import { type StageConstructorArgs } from './types'

export const validStageConstructorArgs = (value: StageConstructorArgs): ResultTuple<StageConstructorArgs> => {
    const result = zStageConstructorArgs.safeParse(value)

    return result.success ? [true, value] : [false, reduceZodErrors(result.error)]
}

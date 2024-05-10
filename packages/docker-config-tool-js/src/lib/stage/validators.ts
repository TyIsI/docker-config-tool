import { type ResultTuple } from '../shared/types'
import { reduceZodErrors } from '../shared/utils'
import { zStageParams } from './schema'
import { type StageParams } from './types'

export const validStageParams = (value: StageParams): ResultTuple<StageParams> => {
    const result = zStageParams.safeParse(value)

    return result.success ? [true, value] : [false, reduceZodErrors(result.error)]
}

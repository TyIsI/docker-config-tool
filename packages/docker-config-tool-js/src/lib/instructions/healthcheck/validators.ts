import { type ResultTuple } from '../../shared/types'
import { reduceZodErrors } from '../../shared/utils'
import { zHealthCheckParams } from './schema'
import { type HealthCheckParams } from './types'

export const validateHealthCheckParams = (value: HealthCheckParams): ResultTuple<HealthCheckParams> => {
    const result = zHealthCheckParams.safeParse(value)

    return result.success ? [true, value] : [false, reduceZodErrors(result.error)]
}

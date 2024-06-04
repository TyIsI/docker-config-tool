import { z } from 'zod'

import { zRequiredString } from '../../shared/schema'

export const zHealthCheckDurationParam = zRequiredString().regex(/^\d+(ms|s|m|h)/, 'Invalid duration parameter')

export const zHealthCheckCmdsNone = z.literal('NONE')

export const zHealthCheckCmdsString = z.string().min(3)

export const zHealthCheckCmdsStringArray = z.array(z.string().min(3))

export const zHealthCheckCmdsParam = z.union(
    [zHealthCheckCmdsNone, zHealthCheckCmdsString, zHealthCheckCmdsStringArray],
    {
        invalid_type_error: 'Invalid health check instruction parameter(s)'
    }
)

export const zHealthCheckRetriesParam = z.coerce.number({ invalid_type_error: 'Invalid retries parameter' })

export const zHealthCheckParamsObject = z.object(
    {
        cmds: zHealthCheckCmdsParam,
        interval: zHealthCheckDurationParam.optional(),
        timeout: zHealthCheckDurationParam.optional(),
        startPeriod: zHealthCheckDurationParam.optional(),
        startInterval: zHealthCheckDurationParam.optional(),
        retries: zHealthCheckRetriesParam.optional()
    },
    { invalid_type_error: 'Invalid health check parameters object' }
)

export const zHealthCheckParams = z.union([
    zHealthCheckCmdsNone,
    zHealthCheckCmdsString,
    zHealthCheckCmdsStringArray,
    zHealthCheckParamsObject
])

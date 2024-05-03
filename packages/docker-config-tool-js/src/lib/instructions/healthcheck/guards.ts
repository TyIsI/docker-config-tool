import {
    zHealthCheckCmdsNone,
    zHealthCheckCmdsParam,
    zHealthCheckCmdsString,
    zHealthCheckCmdsStringArray,
    zHealthCheckDurationParam,
    zHealthCheckParams,
    zHealthCheckParamsObject,
    zHealthCheckRetriesParam
} from './schema'
import {
    type HealthCheckCmdsNone,
    type HealthCheckCmdsParam,
    type HealthCheckCmdsString,
    type HealthCheckCmdsStringArray,
    type HealthCheckDurationParam,
    type HealthCheckParams,
    type HealthCheckParamsObject,
    type HealthCheckRetriesParam
} from './types'

export const isHealthCheckCmdsNone = (value: unknown): value is HealthCheckCmdsNone =>
    zHealthCheckCmdsNone.safeParse(value).success

export const isHealthCheckCmdsString = (value: unknown): value is HealthCheckCmdsString =>
    zHealthCheckCmdsString.safeParse(value).success

export const isHealthCheckCmdsStringArray = (value: unknown): value is HealthCheckCmdsStringArray =>
    zHealthCheckCmdsStringArray.safeParse(value).success

export const isHealthCheckCmdsParam = (value: unknown): value is HealthCheckCmdsParam =>
    zHealthCheckCmdsParam.safeParse(value).success

export const isHealthCheckDurationParam = (value: unknown): value is HealthCheckDurationParam =>
    zHealthCheckDurationParam.safeParse(value).success

export const isHealthCheckRetriesParam = (value: unknown): value is HealthCheckRetriesParam =>
    zHealthCheckRetriesParam.safeParse(value).success

export const isHealthCheckParamsObject = (value: unknown): value is HealthCheckParamsObject =>
    zHealthCheckParamsObject.safeParse(value).success

export const isHealthCheckParams = (value: unknown): value is HealthCheckParams =>
    zHealthCheckParams.safeParse(value).success

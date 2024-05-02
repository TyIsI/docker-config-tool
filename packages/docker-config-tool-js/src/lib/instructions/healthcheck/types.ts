import { type z } from 'zod'

import {
    type zHealthCheckCmdsNone,
    type zHealthCheckCmdsParam,
    type zHealthCheckCmdsString,
    type zHealthCheckDurationParam,
    type zHealthCheckRetriesParam,
    type zHealthCheckParamsObject,
    type zHealthCheckCmdsStringArray,
    type zHealthCheckParams
} from './schema'
import { type Instruction } from '../common/types'

export type HealthCheckDurationParam = z.infer<typeof zHealthCheckDurationParam>

export type HealthCheckCmdsNone = z.infer<typeof zHealthCheckCmdsNone>

export type HealthCheckCmdsString = z.infer<typeof zHealthCheckCmdsString>

export type HealthCheckCmdsStringArray = z.infer<typeof zHealthCheckCmdsStringArray>

export type HealthCheckCmdsParam = z.infer<typeof zHealthCheckCmdsParam>

export type HealthCheckRetriesParam = z.infer<typeof zHealthCheckRetriesParam>

export type HealthCheckParamsObject = z.infer<typeof zHealthCheckParamsObject>

export type HealthCheckParams = z.infer<typeof zHealthCheckParams>

export interface IHealthCheckInstruction extends Instruction {
    addHealthCheckInstruction: (healthCheckCmd: HealthCheckCmdsString) => this
}

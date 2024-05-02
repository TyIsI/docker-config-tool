import { coerceStringArray } from '../../shared/coerce'
import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { isHealthCheckParamsObject, isHealthCheckDurationParam, isHealthCheckRetriesParam } from './guards'
import { type IHealthCheckInstruction, type HealthCheckParams, type HealthCheckCmdsString } from './types'
import { validateHealthCheckParams } from './validators'

export class HealthCheckInstruction implements IHealthCheckInstruction {
    type = 'instruction' as const

    instruction: string[] = []
    interval: string | undefined
    timeout: string | undefined
    startPeriod: string | undefined
    startInterval: string | undefined
    retries: number | undefined

    public constructor(healthcheck: HealthCheckParams) {
        const [success, error] = validateHealthCheckParams(healthcheck)

        if (!success) throw new Error(generateConstructorErrorMessage('HEALTHCHECK', healthcheck, error))

        if (isString(healthcheck)) this.instruction = [healthcheck]

        if (isStringArray(healthcheck)) this.instruction = healthcheck

        if (isHealthCheckParamsObject(healthcheck)) {
            this.instruction = coerceStringArray(healthcheck.instruction)

            if (isHealthCheckDurationParam(healthcheck.interval)) this.interval = healthcheck.interval

            if (isHealthCheckDurationParam(healthcheck.timeout)) this.timeout = healthcheck.timeout

            if (isHealthCheckDurationParam(healthcheck.startPeriod)) this.startPeriod = healthcheck.startPeriod

            if (isHealthCheckDurationParam(healthcheck.startInterval)) this.startInterval = healthcheck.startInterval

            if (isHealthCheckRetriesParam(healthcheck.retries)) this.retries = healthcheck.retries
        }
    }

    public addHealthCheckInstruction(healthCheckCmd: HealthCheckCmdsString): this {
        if (!isString(healthCheckCmd))
            throw new Error(`Invalid healthcheck argument: ${JSON.stringify(healthCheckCmd)}`)

        this.instruction.push(healthCheckCmd)

        return this
    }

    public toString(): string {
        if (this.instruction.includes('NONE')) return 'HEALTHCHECK NONE'

        const result = ['HEALTHCHECK']

        if (this.interval != null) result.push(`--interval=${this.interval}`)
        if (this.timeout != null) result.push(`--timeout=${this.timeout}`)
        if (this.startPeriod != null) result.push(`--start-period=${this.startPeriod}`)
        if (this.startInterval != null) result.push(`--start-interval=${this.startInterval}`)
        if (this.retries != null) result.push(`--retries=${this.retries}`)

        result.push('CMD')

        result.push(JSON.stringify(this.instruction))

        return result.join(' ')
    }
}

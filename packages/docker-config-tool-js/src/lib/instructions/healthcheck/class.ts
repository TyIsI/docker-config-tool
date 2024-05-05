import { coerceStringArray } from '../../shared/coerce'
import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { isHealthCheckDurationParam, isHealthCheckParamsObject, isHealthCheckRetriesParam } from './guards'
import { type HealthCheckCmdsString, type HealthCheckParams, type IHealthCheckInstruction } from './types'
import { validateHealthCheckParams } from './validators'

export class HealthCheckInstruction implements IHealthCheckInstruction {
    type = 'instruction' as const

    instruction: string[] = []
    interval: string | undefined
    timeout: string | undefined
    startPeriod: string | undefined
    startInterval: string | undefined
    retries: number | undefined

    public constructor(healthcheckParam: HealthCheckParams) {
        const [success, error] = validateHealthCheckParams(healthcheckParam)

        if (!success) throw new Error(generateConstructorErrorMessage('HEALTHCHECK', healthcheckParam, error))

        if (isString(healthcheckParam)) this.instruction = [healthcheckParam]

        if (isStringArray(healthcheckParam)) this.instruction = healthcheckParam

        if (isHealthCheckParamsObject(healthcheckParam)) {
            this.instruction = coerceStringArray(healthcheckParam.instruction)

            if (isHealthCheckDurationParam(healthcheckParam.interval)) this.interval = healthcheckParam.interval

            if (isHealthCheckDurationParam(healthcheckParam.timeout)) this.timeout = healthcheckParam.timeout

            if (isHealthCheckDurationParam(healthcheckParam.startPeriod))
                this.startPeriod = healthcheckParam.startPeriod

            if (isHealthCheckDurationParam(healthcheckParam.startInterval))
                this.startInterval = healthcheckParam.startInterval

            if (isHealthCheckRetriesParam(healthcheckParam.retries)) this.retries = healthcheckParam.retries
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

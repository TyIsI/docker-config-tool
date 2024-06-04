import { AbstractBuildableInstruction } from '../../common/classes/instructions/buildable/class'
import { coerceStringArray } from '../../shared/coerce'
import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { isHealthCheckDurationParam, isHealthCheckParamsObject, isHealthCheckRetriesParam } from './guards'
import { type HealthCheckCmdsString, type HealthCheckParams, type IHealthCheckInstruction } from './types'
import { validateHealthCheckParams } from './validators'

export class HealthCheckInstruction extends AbstractBuildableInstruction implements IHealthCheckInstruction {
    type = 'instruction' as const

    instruction = 'HEALTHCHECK' as const

    cmds: string[] = []
    interval: string | undefined
    timeout: string | undefined
    startPeriod: string | undefined
    startInterval: string | undefined
    retries: number | undefined

    public constructor(healthcheckParam: HealthCheckParams) {
        super()

        const [success, error] = validateHealthCheckParams(healthcheckParam)

        if (!success) throw new Error(generateConstructorErrorMessage('HEALTHCHECK', healthcheckParam, error))

        if (isString(healthcheckParam)) this.cmds = [healthcheckParam]

        if (isStringArray(healthcheckParam)) this.cmds = healthcheckParam

        if (isHealthCheckParamsObject(healthcheckParam)) {
            this.cmds = coerceStringArray(healthcheckParam.cmds)

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

        this.cmds.push(healthCheckCmd)

        return this
    }

    public toString(): string {
        const output: string[] = [this.instruction]

        if (this.onBuild) output.unshift('ONBUILD')

        if (this.cmds.includes('NONE')) return 'HEALTHCHECK NONE'

        if (this.interval != null) output.push(`--interval=${this.interval}`)
        if (this.timeout != null) output.push(`--timeout=${this.timeout}`)
        if (this.startPeriod != null) output.push(`--start-period=${this.startPeriod}`)
        if (this.startInterval != null) output.push(`--start-interval=${this.startInterval}`)
        if (this.retries != null) output.push(`--retries=${this.retries}`)

        output.push('CMD')

        output.push(JSON.stringify(this.cmds))

        return output.join(' ')
    }
}

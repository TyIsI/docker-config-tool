import { AbstractBuildableInstruction } from '../../common/classes/instructions/buildable/class'
import { coerceString } from '../../shared/coerce'
import { isEnvVar, isEnvVarArray, isStringArray, isStringRecord } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type EnvInstructionParams, type IEnvInstruction } from './types'

export class EnvInstruction extends AbstractBuildableInstruction implements IEnvInstruction {
    type = 'instruction' as const

    instruction = 'ENV' as const

    envs: Record<string, string> = {}

    public constructor(envParam: EnvInstructionParams) {
        super()

        if (isEnvVar(envParam)) {
            const [envKey, envVal] = envParam.split('=')

            this.envs[envKey] = envVal
        } else if (isStringArray(envParam) && isEnvVarArray(envParam)) {
            envParam.forEach((e) => {
                const [envKey, envVal] = e.split('=')

                this.envs[envKey] = envVal
            })
        } else if (isStringRecord(envParam)) {
            this.envs = envParam
        } else {
            throw new Error(generateConstructorErrorMessage('ENV', envParam))
        }
    }

    addEnv(envName: string, envVal: unknown): this {
        this.envs[envName] = coerceString(envVal)

        return this
    }

    toString(): string {
        const output: string[] = [this.instruction]

        if (this.onBuild) output.unshift('ONBUILD')

        Object.entries(this.envs)
            .map(([k, v]) => [k, v.includes(' ') ? `"${v}"` : v].join('='))
            .forEach((e) => output.push(e))

        return output.join(' ')
    }
}

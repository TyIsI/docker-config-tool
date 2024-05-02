import { coerceString, coerceStringArray } from '../../shared/coerce'
import { isString, isStringArray, isTrueBoolean } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import {
    isRunInstructionArgsObject,
    isRunInstructionBooleanFields,
    isRunInstructionMountRunArg,
    isRunInstructionNetworkRunArg,
    isRunInstructionSecurityRunArg
} from './guards'
import {
    type IRunInstruction,
    type RunInstructionMountType,
    type RunInstructionNetworkType,
    type RunInstructionParameters,
    type RunInstructionSecurityType
} from './types'
import { mapMountOptions } from './utils'
import { validateRunInstructionParameters } from './validators'

export class RunInstruction implements IRunInstruction {
    type = 'instruction' as const

    commands: string[] = []
    mount?: RunInstructionMountType
    network?: RunInstructionNetworkType
    security?: RunInstructionSecurityType

    public constructor(runArgs: RunInstructionParameters) {
        const [valid, result] = validateRunInstructionParameters(runArgs)

        if (!valid) throw new Error(generateConstructorErrorMessage('RUN', runArgs, result))

        if (isString(runArgs)) {
            this.commands = [runArgs]
        } else if (isStringArray(runArgs)) {
            this.commands = runArgs
        } else if (isRunInstructionArgsObject(runArgs)) {
            this.commands = coerceStringArray(runArgs.commands)

            if (runArgs.mount != null && isRunInstructionMountRunArg(runArgs.mount)) this.mount = runArgs.mount

            if (runArgs.network != null && isRunInstructionNetworkRunArg(runArgs.network))
                this.network = runArgs.network

            if (runArgs.security != null && isRunInstructionSecurityRunArg(runArgs.security))
                this.security = runArgs.security
        }
    }

    setMount(mount: RunInstructionMountType): void {
        if (!isRunInstructionMountRunArg(mount)) throw new Error('Invalid mount type')

        this.mount = mount
    }

    setNetwork(network: RunInstructionNetworkType): void {
        if (!isRunInstructionNetworkRunArg(network)) throw new Error('Invalid network type')

        this.network = network
    }

    setSecurity(security: RunInstructionSecurityType): void {
        if (!isRunInstructionSecurityRunArg(security)) throw new Error('Invalid security type')

        this.security = security
    }

    public toString(): string {
        const result = ['RUN']

        if (isRunInstructionMountRunArg(this.mount)) {
            const mountOpts = [`--mount=type=${this.mount.type}`]

            Object.entries(this.mount)
                .filter(([k, v]) => k !== 'type')
                .forEach(([k, v]) => {
                    if (isRunInstructionBooleanFields(k)) {
                        if (isTrueBoolean(v)) mountOpts.push(k in mapMountOptions ? mapMountOptions[k] : k)
                    } else {
                        mountOpts.push(`${k}=${coerceString(v)}`)
                    }
                })

            result.push(mountOpts.join(','))
        }

        if (isRunInstructionNetworkRunArg(this.network)) result.push(`--network=${coerceString(this.network)}`)

        if (isRunInstructionSecurityRunArg(this.security)) result.push(`--security=${coerceString(this.security)}`)

        return [...result, ...this.commands].join(' ')
    }
}

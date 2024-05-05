import { coerceString, coerceStringArray } from '../../shared/coerce'
import { isString, isStringArray, isTrueBoolean } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import {
    isRunInstructionBooleanFields,
    isRunInstructionMountRunArg,
    isRunInstructionNetworkRunArg,
    isRunInstructionParamsObject,
    isRunInstructionSecurityRunArg
} from './guards'
import {
    type IRunInstruction,
    type RunInstructionMountType,
    type RunInstructionNetworkType,
    type RunInstructionParams,
    type RunInstructionSecurityType
} from './types'
import { mapMountOptions } from './utils'
import { validateRunInstructionParams } from './validators'

export class RunInstruction implements IRunInstruction {
    type = 'instruction' as const

    commands: string[] = []
    mount?: RunInstructionMountType
    network?: RunInstructionNetworkType
    security?: RunInstructionSecurityType

    public constructor(runParams: RunInstructionParams) {
        const [valid, result] = validateRunInstructionParams(runParams)

        if (!valid) throw new Error(generateConstructorErrorMessage('RUN', runParams, result))

        if (isString(runParams)) {
            this.commands = [runParams]
        } else if (isStringArray(runParams)) {
            this.commands = runParams
        } else if (isRunInstructionParamsObject(runParams)) {
            this.commands = coerceStringArray(runParams.commands)

            if (runParams.mount != null && isRunInstructionMountRunArg(runParams.mount)) this.mount = runParams.mount

            if (runParams.network != null && isRunInstructionNetworkRunArg(runParams.network))
                this.network = runParams.network

            if (runParams.security != null && isRunInstructionSecurityRunArg(runParams.security))
                this.security = runParams.security
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

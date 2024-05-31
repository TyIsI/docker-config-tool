import { coerceString, coerceStringArray } from '../../shared/coerce'
import { isStringArray, isTrueBoolean } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { coerceRunInstructionMountParam } from './coerce'
import {
    isRunInstructionBooleanFields,
    isRunInstructionMountParam,
    isRunInstructionNetworkParam,
    isRunInstructionParamsObject,
    isRunInstructionSecurityParam
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
    mountOpts: RunInstructionMountType[] = []
    network?: RunInstructionNetworkType
    security?: RunInstructionSecurityType

    public constructor(...runParams: RunInstructionParams) {
        const [valid, result] = validateRunInstructionParams(runParams)

        if (!valid) throw new Error(generateConstructorErrorMessage('RUN', runParams, result))

        if (isStringArray(runParams)) {
            this.commands = runParams
        } else if (isStringArray(runParams[0])) {
            this.commands = runParams[0]
        } else if (isRunInstructionParamsObject(runParams[0])) {
            const runParamObject = runParams[0]

            this.commands = coerceStringArray(runParamObject.commands)

            if (runParamObject.mount != null && isRunInstructionMountParam(runParamObject.mount))
                this.mountOpts.push(coerceRunInstructionMountParam(runParamObject.mount))

            if (runParamObject.network != null && isRunInstructionNetworkParam(runParamObject.network))
                this.network = runParamObject.network

            if (runParamObject.security != null && isRunInstructionSecurityParam(runParamObject.security))
                this.security = runParamObject.security
        }
    }

    setMount(mount: RunInstructionMountType): void {
        if (!isRunInstructionMountParam(mount)) throw new Error('Invalid mount type')

        this.mountOpts.push(coerceRunInstructionMountParam(mount))
    }

    setNetwork(network: RunInstructionNetworkType): void {
        if (!isRunInstructionNetworkParam(network)) throw new Error('Invalid network type')

        this.network = network
    }

    setSecurity(security: RunInstructionSecurityType): void {
        if (!isRunInstructionSecurityParam(security)) throw new Error('Invalid security type')

        this.security = security
    }

    public toString(): string {
        const result = ['RUN']

        if (this.mountOpts.length > 0 && this.mountOpts.every((mountOpt) => isRunInstructionMountParam(mountOpt))) {
            this.mountOpts.forEach((mountOpt) => {
                const mountOptsArray = [`--mount=type=${mountOpt.type}`]

                Object.entries(mountOpt)
                    .filter(([k, v]) => k !== 'type')
                    .forEach(([k, v]) => {
                        if (isRunInstructionBooleanFields(k)) {
                            if (isTrueBoolean(v)) mountOptsArray.push(k in mapMountOptions ? mapMountOptions[k] : k)
                        } else {
                            mountOptsArray.push(`${k}=${coerceString(v)}`)
                        }
                    })

                result.push(mountOptsArray.join(','))
            })
        }

        if (isRunInstructionNetworkParam(this.network)) result.push(`--network=${coerceString(this.network)}`)

        if (isRunInstructionSecurityParam(this.security)) result.push(`--security=${coerceString(this.security)}`)

        return [...result, ...this.commands].join(' ')
    }
}

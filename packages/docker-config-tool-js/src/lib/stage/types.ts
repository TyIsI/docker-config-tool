import { type z } from 'zod'

import { type AddInstructionParams, type IAddInstruction } from '../instructions/add/types'
import { type ArgInstructionParams, type IArgInstruction } from '../instructions/arg/types'
import { type CmdInstructionParams, type ICmdInstruction } from '../instructions/cmd/types'
import { type Instruction } from '../instructions/common/types'
import { type CopyInstructionParams, type ICopyInstruction } from '../instructions/copy/types'
import { type EntryPointInstructionParams, type IEntryPointInstruction } from '../instructions/entrypoint/types'
import { type EnvInstructionParams, type IEnvInstruction } from '../instructions/env/types'
import { type ExposeInstructionParams, type IExposeInstruction } from '../instructions/expose/types'
import {
    type FromInstructionParamObject,
    type FromInstructionParams,
    type IFromInstruction
} from '../instructions/from/types'
import { type HealthCheckParams, type IHealthCheckInstruction } from '../instructions/healthcheck/types'
import { type ILabelInstruction, type LabelInstructionParams } from '../instructions/label/types'
import { type IRunInstruction, type RunInstructionParams } from '../instructions/run/types'
import { type IShellInstruction, type ShellInstructionParams } from '../instructions/shell/types'
import { type IStopSignalInstruction, type StopSignalInstructionParams } from '../instructions/stopsignal/types'
import { type IUserInstruction, type UserInstructionParams } from '../instructions/user/types'
import { type IVolumeInstruction, type VolumeInstructionParams } from '../instructions/volume/types'
import { type IWorkdirInstruction } from '../instructions/workdir/types'
import { type zStageConstructorParams } from './schema'

export interface IStage {
    type: 'stage'

    id: string

    stack: Instruction[]

    appendInstruction: <T = Instruction>(instruction: T) => T

    appendAdd: (...addParams: AddInstructionParams) => IAddInstruction

    appendArg: (argParam: ArgInstructionParams) => IArgInstruction

    appendCmd: (...cmdParams: CmdInstructionParams) => ICmdInstruction

    appendCopy: (...copyInstructionParams: CopyInstructionParams) => ICopyInstruction

    appendEntryPoint: (...entrypointParams: EntryPointInstructionParams) => IEntryPointInstruction

    appendEnv: (envParam: EnvInstructionParams) => IEnvInstruction

    appendExpose: (...exposeParams: ExposeInstructionParams) => IExposeInstruction

    appendFrom: (fromParam: FromInstructionParams) => IFromInstruction

    appendHealthCheck: (healthCheckParam: HealthCheckParams) => IHealthCheckInstruction

    appendLabel: (labelParam: LabelInstructionParams) => ILabelInstruction

    appendRun: (...runParams: RunInstructionParams) => IRunInstruction

    appendShell: (...shellParams: ShellInstructionParams) => IShellInstruction

    appendStopSignal: (stopsignalParam: StopSignalInstructionParams) => IStopSignalInstruction

    appendUser: (...userInstructionParams: UserInstructionParams) => IUserInstruction

    appendVolume: (...volumeParams: VolumeInstructionParams) => IVolumeInstruction

    appendWorkdir: (workdirParam: string) => IWorkdirInstruction

    setId: (id: string) => this

    toString: () => string
}

export interface IStageFromStage extends Omit<FromInstructionParamObject, 'from'> {
    from: IStage
}

export type IStageConstructorParams = IStage | FromInstructionParams | IStageFromStage

export type StageConstructorParams = z.infer<typeof zStageConstructorParams>

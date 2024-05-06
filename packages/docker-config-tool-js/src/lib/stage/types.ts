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
import { type IWorkDirInstruction } from '../instructions/workdir/types'
import { type zStageConstructorParams } from './schema'

export interface IStage {
    type: 'stage'

    id: string

    stack: Instruction[]

    withInstruction: <T = Instruction>(instructionParam: T) => T

    withAdd: (...addParams: AddInstructionParams) => IAddInstruction

    withArg: (argParam: ArgInstructionParams) => IArgInstruction

    withCmd: (...cmdParams: CmdInstructionParams) => ICmdInstruction

    withCopy: (...copyParams: CopyInstructionParams) => ICopyInstruction

    withEntryPoint: (...entryPointParams: EntryPointInstructionParams) => IEntryPointInstruction

    withEnv: (envParam: EnvInstructionParams) => IEnvInstruction

    withExpose: (...exposeParams: ExposeInstructionParams) => IExposeInstruction

    withFrom: (fromParam: FromInstructionParams) => IFromInstruction

    withHealthCheck: (healthCheckParam: HealthCheckParams) => IHealthCheckInstruction

    withLabel: (labelParam: LabelInstructionParams) => ILabelInstruction

    withRun: (...runParams: RunInstructionParams) => IRunInstruction

    withShell: (...shellParams: ShellInstructionParams) => IShellInstruction

    withStopSignal: (stopsignalParam: StopSignalInstructionParams) => IStopSignalInstruction

    withUser: (...userParams: UserInstructionParams) => IUserInstruction

    withVolume: (...volumeParams: VolumeInstructionParams) => IVolumeInstruction

    withWorkDir: (workdirParam: string) => IWorkDirInstruction

    setId: (id: string) => this

    toString: () => string
}

export interface IStageFromStage extends Omit<FromInstructionParamObject, 'from'> {
    from: IStage
}

export type IStageConstructorParams = IStage | FromInstructionParams | IStageFromStage

export type StageConstructorParams = z.infer<typeof zStageConstructorParams>

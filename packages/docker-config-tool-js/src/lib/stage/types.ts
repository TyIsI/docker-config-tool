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

    appendInstruction: <T = Instruction>(instruction: T) => T

    createADD: (...addParams: AddInstructionParams) => IAddInstruction

    createARG: (argParam: ArgInstructionParams) => IArgInstruction

    createCMD: (...cmdParams: CmdInstructionParams) => ICmdInstruction

    createCOPY: (...copyInstructionParams: CopyInstructionParams) => ICopyInstruction

    createENTRYPOINT: (...entrypointCmds: EntryPointInstructionParams) => IEntryPointInstruction

    createENV: (envParam: EnvInstructionParams) => IEnvInstruction

    createEXPOSE: (...exposes: ExposeInstructionParams) => IExposeInstruction

    createFROM: (from: FromInstructionParams) => IFromInstruction

    createHEALTHCHECK: (healthcheck: HealthCheckParams) => IHealthCheckInstruction

    createLABEL: (labelParam: LabelInstructionParams) => ILabelInstruction

    createRUN: (runParams: RunInstructionParams) => IRunInstruction

    createSHELL: (...shellParams: ShellInstructionParams) => IShellInstruction

    createSTOPSIGNAL: (stopsignal: StopSignalInstructionParams) => IStopSignalInstruction

    createUSER: (...userInstructionParams: UserInstructionParams) => IUserInstruction

    createVOLUME: (...volumeParams: VolumeInstructionParams) => IVolumeInstruction

    createWORKDIR: (workdir: string) => IWorkDirInstruction

    setId: (id: string) => IStage

    toString: () => string
}

export interface IStageFromStage extends Omit<FromInstructionParamObject, 'from'> {
    from: IStage
}

export type IStageConstructorParams = IStage | FromInstructionParams | IStageFromStage

export type StageConstructorParams = z.infer<typeof zStageConstructorParams>

import { type z } from 'zod'

import { type AddInstructionParams, type IAddInstruction } from '../instructions/add/types'
import { type ArgInstructionParameters, type IArgInstruction } from '../instructions/arg/types'
import { type CmdInstructionParameters, type ICmdInstruction } from '../instructions/cmd/types'
import { type Instruction } from '../instructions/common/types'
import { type CopyInstructionParams, type ICopyInstruction } from '../instructions/copy/types'
import { type EntryPointInstructionParameters, type IEntryPointInstruction } from '../instructions/entrypoint/types'
import { type EnvInstructionParameters, type IEnvInstruction } from '../instructions/env/types'
import { type ExposeInstructionParameters, type IExposeInstruction } from '../instructions/expose/types'
import {
    type FromInstructionParameterObject,
    type FromInstructionParameters,
    type IFromInstruction
} from '../instructions/from/types'
import { type HealthCheckParams, type IHealthCheckInstruction } from '../instructions/healthcheck/types'
import { type ILabelInstruction, type LabelInstructionArgs } from '../instructions/label/types'
import { type IRunInstruction, type RunInstructionParameters } from '../instructions/run/types'
import { type IShellInstruction, type ShellInstructionParameters } from '../instructions/shell/types'
import { type IStopSignalInstruction, type StopSignalInstructionParameters } from '../instructions/stopsignal/types'
import { type IUserInstruction, type UserInstructionParameters } from '../instructions/user/types'
import { type IVolumeInstruction, type VolumeInstructionParameters } from '../instructions/volume/types'
import { type IWorkDirInstruction } from '../instructions/workdir/types'
import { type zStageConstructorArgs } from './schema'

export interface IStage {
    type: 'stage'

    id: string

    stack: Instruction[]

    appendInstruction: <T = Instruction>(instruction: T) => T

    createADD: (...addParams: AddInstructionParams) => IAddInstruction

    createARG: (argParam: ArgInstructionParameters) => IArgInstruction

    createCMD: (...cmdParams: CmdInstructionParameters) => ICmdInstruction

    createCOPY: (...copyInstructionParams: CopyInstructionParams) => ICopyInstruction

    createENTRYPOINT: (...entrypointCmds: EntryPointInstructionParameters) => IEntryPointInstruction

    createENV: (envParam: EnvInstructionParameters) => IEnvInstruction

    createEXPOSE: (...exposes: ExposeInstructionParameters) => IExposeInstruction

    createFROM: (from: FromInstructionParameters) => IFromInstruction

    createHEALTHCHECK: (healthcheck: HealthCheckParams) => IHealthCheckInstruction

    createLABEL: (labelParam: LabelInstructionArgs) => ILabelInstruction

    createRUN: (runArgs: RunInstructionParameters) => IRunInstruction

    createSHELL: (...shellParameters: ShellInstructionParameters) => IShellInstruction

    createSTOPSIGNAL: (stopsignal: StopSignalInstructionParameters) => IStopSignalInstruction

    createUSER: (...userInstructionParams: UserInstructionParameters) => IUserInstruction

    createVOLUME: (...volumeParameters: VolumeInstructionParameters) => IVolumeInstruction

    createWORKDIR: (workdir: string) => IWorkDirInstruction

    setId: (id: string) => IStage

    toString: () => string
}

export interface IStageFromStage extends Omit<FromInstructionParameterObject, 'from'> {
    from: IStage
}

export type IStageConstructorArgs = IStage | FromInstructionParameters | IStageFromStage

export type StageConstructorArgs = z.infer<typeof zStageConstructorArgs>

import { AddInstruction } from '../instructions/add/class'
import { type AddInstructionParams, type IAddInstruction } from '../instructions/add/types'
import { ArgInstruction } from '../instructions/arg/class'
import { type ArgInstructionParams, type IArgInstruction } from '../instructions/arg/types'
import { CmdInstruction } from '../instructions/cmd/class'
import { type CmdInstructionParams, type ICmdInstruction } from '../instructions/cmd/types'
import { isInstruction } from '../instructions/common/guards'
import { type Instruction } from '../instructions/common/types'
import { CopyInstruction } from '../instructions/copy/class'
import { type CopyInstructionParams, type ICopyInstruction } from '../instructions/copy/types'
import { EntryPointInstruction } from '../instructions/entrypoint/class'
import { type EntryPointInstructionParams, type IEntryPointInstruction } from '../instructions/entrypoint/types'
import { EnvInstruction } from '../instructions/env/class'
import { type EnvInstructionParams, type IEnvInstruction } from '../instructions/env/types'
import { ExposeInstruction } from '../instructions/expose/class'
import { type ExposeInstructionParams, type IExposeInstruction } from '../instructions/expose/types'
import { FromInstruction } from '../instructions/from/class'
import { isFromInstructionStringFromParam } from '../instructions/from/guards'
import { type FromInstructionParams, type IFromInstruction } from '../instructions/from/types'
import { HealthCheckInstruction } from '../instructions/healthcheck/class'
import { type HealthCheckParams, type IHealthCheckInstruction } from '../instructions/healthcheck/types'
import { LabelInstruction } from '../instructions/label/class'
import { type ILabelInstruction, type LabelInstructionParams } from '../instructions/label/types'
import { RunInstruction } from '../instructions/run/class'
import { type IRunInstruction, type RunInstructionParams } from '../instructions/run/types'
import { ShellInstruction } from '../instructions/shell/class'
import { type IShellInstruction, type ShellInstructionParams } from '../instructions/shell/types'
import { StopSignalInstruction } from '../instructions/stopsignal/class'
import { type IStopSignalInstruction, type StopSignalInstructionParams } from '../instructions/stopsignal/types'
import { UserInstruction } from '../instructions/user/class'
import { type IUserInstruction, type UserInstructionParams } from '../instructions/user/types'
import { VolumeInstruction } from '../instructions/volume/class'
import { type IVolumeInstruction, type VolumeInstructionParams } from '../instructions/volume/types'
import { WorkdirInstruction } from '../instructions/workdir/class'
import { type IWorkDirInstruction } from '../instructions/workdir/types'
import { coerceFirstValue } from '../shared/coerce'
import { isString } from '../shared/guards'
import { generateConstructorErrorMessage, randomString } from '../shared/utils'
import { isStage, isStageFromStage } from './guards'
import { type IStage, type IStageConstructorParams } from './types'
import { validStageConstructorParams } from './validators'

export class Stage implements IStage {
    type = 'stage' as const

    id: string
    stack: Instruction[] = []

    constructor(from: IStageConstructorParams) {
        const [valid, error] = validStageConstructorParams(from)

        if (!valid) throw new Error(generateConstructorErrorMessage('FROM', from, error))

        if (isFromInstructionStringFromParam(from)) from = { from }

        if (isStage(from)) from = { from: from.id }

        if (isStageFromStage(from)) from = { ...from, from: from.from.id }

        this.id = coerceFirstValue<string>(from.as, randomString())

        this.createFROM(from)
    }

    appendInstruction<T = Instruction>(instruction: T): T {
        if (!isInstruction(instruction)) {
            throw new Error('Invalid Instruction')
        }

        this.stack.push(instruction)

        return instruction
    }

    createADD(...addParams: AddInstructionParams): IAddInstruction {
        return this.appendInstruction<AddInstruction>(new AddInstruction(...addParams))
    }

    createARG(argParam: ArgInstructionParams): IArgInstruction {
        return this.appendInstruction<ArgInstruction>(new ArgInstruction(argParam))
    }

    createCMD(...cmdParams: CmdInstructionParams): ICmdInstruction {
        return this.appendInstruction<CmdInstruction>(new CmdInstruction(...cmdParams))
    }

    createCOPY(...copyInstructionParams: CopyInstructionParams): ICopyInstruction {
        return this.appendInstruction<CopyInstruction>(new CopyInstruction(...copyInstructionParams))
    }

    createFROM(from: FromInstructionParams): IFromInstruction {
        return this.appendInstruction<IFromInstruction>(new FromInstruction(from).setAs(this.id))
    }

    createENTRYPOINT(...entrypointCmds: EntryPointInstructionParams): IEntryPointInstruction {
        return this.appendInstruction<EntryPointInstruction>(new EntryPointInstruction(...entrypointCmds))
    }

    createENV(envParam: EnvInstructionParams): IEnvInstruction {
        return this.appendInstruction<EnvInstruction>(new EnvInstruction(envParam))
    }

    createEXPOSE(...exposes: ExposeInstructionParams): IExposeInstruction {
        return this.appendInstruction<ExposeInstruction>(new ExposeInstruction(...exposes))
    }

    createHEALTHCHECK(healthcheck: HealthCheckParams): IHealthCheckInstruction {
        return this.appendInstruction<HealthCheckInstruction>(new HealthCheckInstruction(healthcheck))
    }

    createLABEL(labelParam: LabelInstructionParams): ILabelInstruction {
        return this.appendInstruction<LabelInstruction>(new LabelInstruction(labelParam))
    }

    createRUN(instruction: RunInstructionParams): IRunInstruction {
        return this.appendInstruction<RunInstruction>(new RunInstruction(instruction))
    }

    createSHELL(...shellParams: ShellInstructionParams): IShellInstruction {
        return this.appendInstruction<ShellInstruction>(new ShellInstruction(...shellParams))
    }

    createSTOPSIGNAL(stopsignal: StopSignalInstructionParams): IStopSignalInstruction {
        return this.appendInstruction<StopSignalInstruction>(new StopSignalInstruction(stopsignal))
    }

    createUSER(...userInstructionParams: UserInstructionParams): IUserInstruction {
        return this.appendInstruction<UserInstruction>(new UserInstruction(...userInstructionParams))
    }

    createVOLUME(...volumeParams: VolumeInstructionParams): IVolumeInstruction {
        return this.appendInstruction<VolumeInstruction>(new VolumeInstruction(...volumeParams))
    }

    createWORKDIR(workdir: string): IWorkDirInstruction {
        return this.appendInstruction<WorkdirInstruction>(new WorkdirInstruction(workdir))
    }

    setId(id: string): IStage {
        if (!isString(id)) throw new Error(`Invalid id argument: ${JSON.stringify(id)}`)

        this.id = id

        return this
    }

    toString(): string {
        // Render everything
        return this.stack.map((e) => e.toString()).join('\n\n') + '\n'
    }
}

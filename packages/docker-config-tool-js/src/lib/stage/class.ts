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
import { WorkDirInstruction } from '../instructions/workdir/class'
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

    public constructor(fromParam: IStageConstructorParams) {
        const [valid, error] = validStageConstructorParams(fromParam)

        if (!valid) throw new Error(generateConstructorErrorMessage('FROM', fromParam, error))

        if (isFromInstructionStringFromParam(fromParam)) fromParam = { from: fromParam }

        if (isStage(fromParam)) fromParam = { from: fromParam.id }

        if (isStageFromStage(fromParam)) fromParam = { ...fromParam, from: fromParam.from.id }

        this.id = coerceFirstValue<string>(fromParam.as, randomString())

        this.withFrom(fromParam)
    }

    withInstruction<T = Instruction>(instructionParam: T): T {
        if (!isInstruction(instructionParam)) {
            throw new Error('Invalid Instruction')
        }

        this.stack.push(instructionParam)

        return instructionParam
    }

    withAdd(...addParams: AddInstructionParams): IAddInstruction {
        return this.withInstruction<AddInstruction>(new AddInstruction(...addParams))
    }

    withArg(argParam: ArgInstructionParams): IArgInstruction {
        return this.withInstruction<ArgInstruction>(new ArgInstruction(argParam))
    }

    withCmd(...cmdParams: CmdInstructionParams): ICmdInstruction {
        return this.withInstruction<CmdInstruction>(new CmdInstruction(...cmdParams))
    }

    withCopy(...copyInstructionParams: CopyInstructionParams): ICopyInstruction {
        return this.withInstruction<CopyInstruction>(new CopyInstruction(...copyInstructionParams))
    }

    withFrom(from: FromInstructionParams): IFromInstruction {
        return this.withInstruction<IFromInstruction>(new FromInstruction(from).setAs(this.id))
    }

    withEntryPoint(...entrypointCmds: EntryPointInstructionParams): IEntryPointInstruction {
        return this.withInstruction<EntryPointInstruction>(new EntryPointInstruction(...entrypointCmds))
    }

    withEnv(envParam: EnvInstructionParams): IEnvInstruction {
        return this.withInstruction<EnvInstruction>(new EnvInstruction(envParam))
    }

    withExpose(...exposes: ExposeInstructionParams): IExposeInstruction {
        return this.withInstruction<ExposeInstruction>(new ExposeInstruction(...exposes))
    }

    withHealthCheck(healthcheck: HealthCheckParams): IHealthCheckInstruction {
        return this.withInstruction<HealthCheckInstruction>(new HealthCheckInstruction(healthcheck))
    }

    withLabel(labelParam: LabelInstructionParams): ILabelInstruction {
        return this.withInstruction<LabelInstruction>(new LabelInstruction(labelParam))
    }

    withRun(...runParams: RunInstructionParams): IRunInstruction {
        return this.withInstruction<RunInstruction>(new RunInstruction(...runParams))
    }

    withShell(...shellParams: ShellInstructionParams): IShellInstruction {
        return this.withInstruction<ShellInstruction>(new ShellInstruction(...shellParams))
    }

    withStopSignal(stopsignalParam: StopSignalInstructionParams): IStopSignalInstruction {
        return this.withInstruction<StopSignalInstruction>(new StopSignalInstruction(stopsignalParam))
    }

    withUser(...userInstructionParams: UserInstructionParams): IUserInstruction {
        return this.withInstruction<UserInstruction>(new UserInstruction(...userInstructionParams))
    }

    withVolume(...volumeParams: VolumeInstructionParams): IVolumeInstruction {
        return this.withInstruction<VolumeInstruction>(new VolumeInstruction(...volumeParams))
    }

    withWorkDir(workdir: string): IWorkDirInstruction {
        return this.withInstruction<WorkDirInstruction>(new WorkDirInstruction(workdir))
    }

    setId(id: string): this {
        if (!isString(id)) throw new Error(`Invalid id argument: ${JSON.stringify(id)}`)

        this.id = id

        return this
    }

    toString(): string {
        // Render everything
        return this.stack.map((e) => e.toString()).join('\n\n') + '\n'
    }
}

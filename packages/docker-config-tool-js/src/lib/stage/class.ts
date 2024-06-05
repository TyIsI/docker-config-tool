import { CommentInstruction } from '../common/classes/instructions/comment/class'
import { type ICommentInstruction } from '../common/classes/instructions/comment/types'
import { isInstruction } from '../common/classes/instructions/guards'
import { type Instruction } from '../common/classes/instructions/types'
import { AddInstruction } from '../instructions/add/class'
import { type AddInstructionParams, type IAddInstruction } from '../instructions/add/types'
import { ArgInstruction } from '../instructions/arg/class'
import { type ArgInstructionParams, type IArgInstruction } from '../instructions/arg/types'
import { CmdInstruction } from '../instructions/cmd/class'
import { type CmdInstructionParams, type ICmdInstruction } from '../instructions/cmd/types'
import { CopyInstruction } from '../instructions/copy/class'
import { type CopyInstructionParams, type ICopyInstruction } from '../instructions/copy/types'
import { EntryPointInstruction } from '../instructions/entrypoint/class'
import { type EntryPointInstructionParams, type IEntryPointInstruction } from '../instructions/entrypoint/types'
import { EnvInstruction } from '../instructions/env/class'
import { type EnvInstructionParams, type IEnvInstruction } from '../instructions/env/types'
import { ExposeInstruction } from '../instructions/expose/class'
import { type ExposeInstructionParams, type IExposeInstruction } from '../instructions/expose/types'
import { FromInstruction } from '../instructions/from/class'
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
import { isString } from '../shared/guards'
import { generateConstructorErrorMessage, getCommonPath, randomString } from '../shared/utils'
import { coerceStageFromInstructionObjectParam } from './coerce'
import { type IStage, type StageParams } from './types'
import { validStageParams } from './validators'

import { createHash } from 'node:crypto'

export class Stage implements IStage {
    type = 'stage' as const

    id: string = this.getRandomId()

    stack: Instruction[] = []

    public constructor(stageParam: StageParams) {
        const [valid, result] = validStageParams(stageParam)

        if (!valid) throw new Error(generateConstructorErrorMessage('STAGE', stageParam, result))

        stageParam = coerceStageFromInstructionObjectParam(stageParam)

        // Sync id
        if (stageParam.as != null) this.id = stageParam.as
        else stageParam.as = this.id

        this.withFrom(stageParam)
    }

    private getRandomId(): string {
        const stack = new Error('getRandomId').stack

        /* istanbul ignore next */
        if (stack == null) return this.forceRandomId()

        const cwd = process.cwd()

        const parsedStack = stack
            ?.split('\n')
            .slice(1)
            .filter((e) => !/node:internal|node_modules|at new Promise/.test(e))
            .map((e) => (/\(.+\)/.test(e) ? e.replace(/.+\((.+)\)/, '$1') : e))
            .map((e) => e.replace(/^\s+at\s/, ''))
            .map((e) => e.replace(/file:\/\//, ''))
            .map((e) => e.replace(`${getCommonPath(cwd, e)}/`, ''))

        const hash = createHash('sha256')

        parsedStack.forEach((e) => hash.update(e))

        return `stage-${hash.digest('hex').substring(0, 8)}`
    }

    private forceRandomId(): string {
        return `stage-${randomString()}`
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

    withComment(comment: string): ICommentInstruction {
        return this.withInstruction<CommentInstruction>(new CommentInstruction(comment))
    }

    withCopy(...copyInstructionParams: CopyInstructionParams): ICopyInstruction {
        return this.withInstruction<CopyInstruction>(new CopyInstruction(...copyInstructionParams))
    }

    withFrom(from: FromInstructionParams): IFromInstruction {
        return this.withInstruction<IFromInstruction>(new FromInstruction(from))
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

        if (!('setAs' in this.stack[0]) || typeof this.stack[0].setAs !== 'function')
            throw new Error(`First instruction is not FROM`)

        this.stack[0].setAs(id)

        return this
    }

    toString(): string {
        return this.stack.map((e) => e.toString()).join('\n\n')
    }
}

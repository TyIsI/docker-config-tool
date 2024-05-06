import { ArgInstruction } from '../lib/instructions/arg/class'
import { type ArgInstructionParams } from '../lib/instructions/arg/types'
import { type FromInstructionParams } from '../lib/instructions/from/types'
import { Stage } from '../lib/stage/class'
import { type IStage, type IStageFromStage } from '../lib/stage/types'
import { type IDockerConfigTool } from './types'

export class DockerConfigTool implements IDockerConfigTool {
    args: ArgInstruction[] = []
    stack: IStage[] = []

    public constructor(stackParam?: IStage[]) {
        this.stack = stackParam ?? []
    }

    withArg(arg: ArgInstructionParams): this {
        const argInstruction = new ArgInstruction(arg)

        this.args.push(argInstruction)

        return this
    }

    withStage(fromParam: FromInstructionParams | IStageFromStage | IStage): IStage {
        const stage: Stage = new Stage(fromParam)

        this.stack.push(stage)

        return stage
    }

    toString(): string {
        if (this.stack.length === 0) throw new Error('Empty stack. Nothing to print.')

        return [...this.args, '', ...this.stack].map((e) => e.toString()).join('\n')
    }
}

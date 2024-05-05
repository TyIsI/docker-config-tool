import { type FromInstructionParams } from '../lib/instructions/from/types'
import { Stage } from '../lib/stage/class'
import { type IStage, type IStageFromStage } from '../lib/stage/types'
import { type IDockerConfigTool } from './types'

export class DockerConfigTool implements IDockerConfigTool {
    stack: IStage[] = []

    constructor(stack?: IStage[]) {
        this.stack = stack ?? []
    }

    createStage(from: FromInstructionParams | IStageFromStage | IStage): IStage {
        const stage: Stage = new Stage(from)

        this.stack.push(stage)

        return stage
    }

    toString(): string {
        if (this.stack.length === 0) throw new Error('Empty stack. Nothing to print.')

        return this.stack.map((e) => e.toString()).join('\n')
    }
}

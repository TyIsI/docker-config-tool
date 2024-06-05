import { CommentInstruction } from '../lib/common/classes/instructions/comment/class'
import { DirectiveInstruction } from '../lib/common/classes/instructions/directive/class'
import { ArgInstruction } from '../lib/instructions/arg/class'
import { type ArgInstructionParams } from '../lib/instructions/arg/types'
import { type FromInstructionParams } from '../lib/instructions/from/types'
import { Stage } from '../lib/stage/class'
import { type IStage, type StageFromInstructionObjectParam } from '../lib/stage/types'
import { type IDockerConfigTool } from './types'

export class DockerConfigTool implements IDockerConfigTool {
    directives: DirectiveInstruction[] = []
    stack: Array<ArgInstruction | CommentInstruction | IStage> = []

    public constructor(stackParam?: IStage[]) {
        this.stack = stackParam ?? []
    }

    withArg(arg: ArgInstructionParams): this {
        const argInstruction = new ArgInstruction(arg)

        if (this.stack.length > 0 && this.stack.some((e) => e != null && e.type === 'stage'))
            throw new Error('ARGs can only be added before stages')

        this.stack.push(argInstruction)

        return this
    }

    withComment(comment: string): this {
        const commentInstruction = new CommentInstruction(comment)

        this.stack.push(commentInstruction)

        return this
    }

    withDirective(directiveType: string, directiveValue: string): this {
        const directiveInstruction = new DirectiveInstruction(directiveType, directiveValue)

        this.directives.push(directiveInstruction)

        return this
    }

    withStage(fromParam: FromInstructionParams | StageFromInstructionObjectParam | IStage): IStage {
        const stage: Stage = new Stage(fromParam)

        this.stack.push(stage)

        return stage
    }

    toString(): string {
        if (this.stack.length === 0) throw new Error('Empty stack. Nothing to print.')

        return (this.directives.length > 0 ? [...this.directives, ...this.stack] : this.stack)
            .map((e) => e.toString())
            .join('\n\n')
    }
}

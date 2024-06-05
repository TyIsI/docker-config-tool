import { type ArgInstructionParams } from '../lib/instructions/arg/types'
import { type FromInstructionParams } from '../lib/instructions/from/types'
import { type IStage, type StageFromInstructionObjectParam } from '../lib/stage/types'

export interface IDockerConfigTool {
    withArg: (arg: ArgInstructionParams) => this

    withComment: (comment: string) => this

    withDirective: (directiveType: string, directiveValue: string) => this

    withStage: (from: FromInstructionParams | StageFromInstructionObjectParam | IStage) => IStage

    toString: () => string
}

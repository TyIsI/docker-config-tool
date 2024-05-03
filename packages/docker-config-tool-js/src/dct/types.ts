import { type FromInstructionParameters } from '../lib/instructions/from/types'
import { type IStage, type IStageFromStage } from '../lib/stage/types'

export interface IDockerConfigTool {
    createStage: (from: FromInstructionParameters | IStageFromStage | IStage) => IStage

    toString: () => string
}

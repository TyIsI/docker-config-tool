import { type FromInstructionParams } from '../lib/instructions/from/types'
import { type IStage, type IStageFromStage } from '../lib/stage/types'

export interface IDockerConfigTool {
    createStage: (from: FromInstructionParams | IStageFromStage | IStage) => IStage

    toString: () => string
}

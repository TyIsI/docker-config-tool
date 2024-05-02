import { type FromInstructionParameters } from '../instructions/from/types'
import { isStageFromStage } from './guards'

export const coerceStageFromStage = (from: unknown): FromInstructionParameters => {
    if (!isStageFromStage(from)) throw new Error('Stage from stage is not a from stage from a stage')

    return { ...from, from: from.from.id }
}

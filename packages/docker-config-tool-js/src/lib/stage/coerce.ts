import { isFromInstructionObjectParam } from '../instructions/from/guards'
import { type FromInstructionObjectParam } from '../instructions/from/types'
import { isDockerImageReference } from '../shared/guards'
import { isStageFromInstructionObjectParam, isStageParam } from './guards'
import { type StageParams } from './types'

export const coerceStageFromInstructionObjectParam = (stageParam: StageParams): FromInstructionObjectParam => {
    if (isDockerImageReference(stageParam)) return { from: stageParam }

    if (isFromInstructionObjectParam(stageParam)) return stageParam

    if (isStageParam(stageParam)) return { from: stageParam.id }

    if (isStageFromInstructionObjectParam(stageParam)) return { ...stageParam, from: stageParam.from.id }

    throw new Error('Could not coerce invalid stageParam')
}

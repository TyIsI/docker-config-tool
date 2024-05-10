import { isDockerImageReference } from '../../shared/guards'
import { isStage, isStageFromInstructionObjectParam } from '../../stage/guards'
import { type RunInstructionMountType } from './types'

export const coerceRunInstructionMountParam = (value: RunInstructionMountType): RunInstructionMountType => {
    if ('from' in value) {
        const { from } = value

        if (isDockerImageReference(from)) value.from = from

        if (isStage(from)) value.from = from.id

        if (isStageFromInstructionObjectParam(from)) value.from = from.from.id
    }

    return value
}

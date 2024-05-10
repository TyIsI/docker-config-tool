import { type IStage, type StageFromInstructionObjectParam, type StageParam, type StageParams } from './types'
import { zStage, zStageFromInstructionObjectParam, zStageParams } from './schema'

export const isStage = (value: unknown): value is IStage => zStage.safeParse(value).success
export const isStageParam = (value: unknown): value is StageParam => zStage.safeParse(value).success

export const isStageFromInstructionObjectParam = (value: unknown): value is StageFromInstructionObjectParam =>
    zStageFromInstructionObjectParam.safeParse(value).success

export const isStageConstructorParams = (value: unknown): value is StageParams => zStageParams.safeParse(value).success

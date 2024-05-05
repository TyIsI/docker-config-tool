import { type IStage, type IStageFromStage, type StageConstructorParams } from './types'
import { zStage, zStageConstructorParams, zStageFromInstruction as zStageFromStage } from './schema'

export const isStage = (value: unknown): value is IStage => zStage.safeParse(value).success

export const isStageFromStage = (value: unknown): value is IStageFromStage => zStageFromStage.safeParse(value).success

export const isStageConstructorParams = (value: unknown): value is StageConstructorParams =>
    zStageConstructorParams.safeParse(value).success

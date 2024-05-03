import { type IStage, type IStageFromStage, type StageConstructorArgs } from './types'
import { zStage, zStageConstructorArgs, zStageFromInstruction as zStageFromStage } from './schema'

export const isStage = (value: unknown): value is IStage => zStage.safeParse(value).success

export const isStageFromStage = (value: unknown): value is IStageFromStage => zStageFromStage.safeParse(value).success

export const isStageConstructorArgs = (value: unknown): value is StageConstructorArgs =>
    zStageConstructorArgs.safeParse(value).success

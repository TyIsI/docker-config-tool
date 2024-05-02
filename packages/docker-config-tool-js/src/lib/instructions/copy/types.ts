import { type z } from 'zod'

import { type IStage } from '../../stage/types'
import { type Instruction } from '../common/types'
import {
    type zCopyInstructionFrom,
    type zCopyInstructionDestination,
    type zCopyInstructionSources,
    type zCopyInstructionChown,
    type zCopyInstructionChmod,
    type zCopyInstructionLink,
    type zCopyInstructionParents,
    type zCopyInstructionExclude,
    type zCopyInstructionExcludes,
    type zCopyInstructionParamObject,
    type zCopyInstructionParams
} from './schema'

export type CopyInstructionSources = z.infer<typeof zCopyInstructionSources>

export type CopyInstructionDestination = z.infer<typeof zCopyInstructionDestination>

export type CopyInstructionFrom = z.infer<typeof zCopyInstructionFrom>

export type CopyInstructionChown = z.infer<typeof zCopyInstructionChown>

export type CopyInstructionChmod = z.infer<typeof zCopyInstructionChmod>

export type CopyInstructionLink = z.infer<typeof zCopyInstructionLink>

export type CopyInstructionParents = z.infer<typeof zCopyInstructionParents>

export type CopyInstructionExclude = z.infer<typeof zCopyInstructionExclude>

export type CopyInstructionExcludes = z.infer<typeof zCopyInstructionExcludes>

export type CopyInstructionParamObject = z.infer<typeof zCopyInstructionParamObject>

export type CopyInstructionParams = z.infer<typeof zCopyInstructionParams>

export interface ICopyInstruction extends Instruction {
    setFrom: (from: string | IStage) => this
    setChown: (chown: string) => this
    setChmod: (chmod: string) => this
    setLink: (link?: boolean) => this
    setLinked: () => this
    setParents: (parents?: boolean) => this
    addExclude: (exclude: string) => this
}

import { type z } from 'zod'

import { type BuildableInstruction } from '../../common/classes/instructions/buildable/types'
import {
    type zAddInstructionExclude,
    type zAddInstructionExcludes,
    type zAddInstructionParamObject,
    type zAddInstructionParams
} from './schema'

export type AddInstructionParamObject = z.input<typeof zAddInstructionParamObject>

export type AddInstructionParams = z.input<typeof zAddInstructionParams>

export type AddInstructionExclude = z.infer<typeof zAddInstructionExclude>

export type AddInstructionExcludes = z.infer<typeof zAddInstructionExcludes>

export interface IAddInstruction extends BuildableInstruction {
    instruction: 'ADD'

    setKeepGitDir: (keepGitDir?: boolean) => this

    setChecksum: (checksum: string) => this

    setChown: (chown: string) => this

    setChmod: (chmod: string) => this

    setLink: (link?: boolean) => this

    addExclude: (exclude: string) => this
}

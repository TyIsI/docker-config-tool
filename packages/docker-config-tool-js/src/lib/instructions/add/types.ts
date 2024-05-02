import { type z } from 'zod'

import { type Instruction } from '../common/types'
import { type zAddInstructionParamObject, type zAddInstructionParams } from './schema'

// export interface AddInstructionParamObject {
//     sources: string | string[]
//     destination: string

//     keepGitDir?: boolean
//     checksum?: string
//     chown?: string
//     chmod?: string
//     link?: boolean
//     exclude?: string | string[]
//     excludes?: string[]
// }

export type AddInstructionParamObject = z.input<typeof zAddInstructionParamObject>

// export type AddInstructionParams = string[] | [AddInstructionParamObject]

export type AddInstructionParams = z.input<typeof zAddInstructionParams>

export interface IAddInstruction extends Instruction {
    setKeepGitDir: (keepGitDir?: boolean) => this

    setChecksum: (checksum: string) => this

    setChown: (chown: string) => this

    setChmod: (chmod: string) => this

    setLink: (link?: boolean) => this

    addExclude: (exclude: string) => this
}

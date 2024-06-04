import { type BuildableInstruction } from '../../common/classes/instructions/types'

export type CmdInstructionParams = string[]

export interface ICmdInstruction extends BuildableInstruction {
    instruction: 'CMD'

    addCmd: (cmd: string) => ICmdInstruction
}

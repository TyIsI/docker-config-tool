import { type BuildableInstruction } from '../../common/classes/instructions/types'

export interface IWorkDirInstruction extends BuildableInstruction {
    instruction: 'WORKDIR'
}

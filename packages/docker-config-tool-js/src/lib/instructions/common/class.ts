import { type Instruction } from './types'

export abstract class BaseInstruction implements Instruction {
    type = 'instruction' as const

    abstract toString(): string
}

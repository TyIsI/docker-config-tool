import { type BaseInstruction, type ValidInstructions } from './types'

export abstract class AbstractBaseInstruction implements BaseInstruction {
    type = 'instruction' as const

    abstract instruction: ValidInstructions

    output: string[] = []

    abstract toString(): string
}

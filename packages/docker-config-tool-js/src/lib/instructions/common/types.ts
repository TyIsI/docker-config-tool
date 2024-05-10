export interface Instruction {
    type: 'instruction'

    toString: () => string
}

export type Instructions = Instruction[]

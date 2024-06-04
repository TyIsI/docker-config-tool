import { type NetworkProtocols } from '../../shared/types'
import { type BuildableInstruction } from '../../common/classes/instructions/types'

type ExposePortType = number | string

export interface ExposePortDefinition {
    port: ExposePortType
    proto?: NetworkProtocols
}

export type ExposePortDefinitionTuple = [ExposePortType, NetworkProtocols?]

export type ExposeInstructionParam = string | number | ExposePortDefinition | ExposePortDefinitionTuple
export type ExposeInstructionParams = ExposeInstructionParam[]

export interface IExposeInstruction extends BuildableInstruction {
    instruction: 'EXPOSE'
}

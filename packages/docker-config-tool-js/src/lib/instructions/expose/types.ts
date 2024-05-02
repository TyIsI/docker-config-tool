import { type NetworkProtocols } from '../../shared/types'
import { type Instruction } from '../common/types'

type ExposePortType = number | string

export interface ExposePortDefinition {
    port: ExposePortType
    proto?: NetworkProtocols
}

export type ExposePortDefinitionTuple = [ExposePortType, NetworkProtocols?]

export type ExposeInstructionParameter = string | number | ExposePortDefinition | ExposePortDefinitionTuple
export type ExposeInstructionParameters = ExposeInstructionParameter[]

export interface IExposeInstruction extends Instruction {}

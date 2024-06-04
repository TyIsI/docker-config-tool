import { AbstractBaseInstruction } from '../base/class'
import { type GenericInstruction } from './types'

export abstract class AbstractGenericInstruction extends AbstractBaseInstruction implements GenericInstruction {
    buildable = false as const
}

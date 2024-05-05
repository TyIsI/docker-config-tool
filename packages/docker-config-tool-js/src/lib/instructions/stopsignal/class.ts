import { generateConstructorErrorMessage } from '../../shared/utils'
import { isStopSignalNumber, isStopSignalString } from './guards'
import { type IStopSignalInstruction, type StopSignalInstructionParams } from './types'

export class StopSignalInstruction implements IStopSignalInstruction {
    type = 'instruction' as const

    stopsignal: string | number

    constructor(stopsignal: StopSignalInstructionParams) {
        if (isStopSignalNumber(stopsignal)) this.stopsignal = stopsignal
        else if (isStopSignalString(stopsignal))
            this.stopsignal = stopsignal.startsWith('SIG') ? stopsignal : `SIG${stopsignal}`
        else throw new Error(generateConstructorErrorMessage(`STOPSIGNAL`, stopsignal))
    }

    toString(): string {
        return ['STOPSIGNAL', this.stopsignal].join(' ')
    }
}

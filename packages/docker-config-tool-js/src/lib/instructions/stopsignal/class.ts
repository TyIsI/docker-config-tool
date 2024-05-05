import { generateConstructorErrorMessage } from '../../shared/utils'
import { isStopSignalNumber, isStopSignalString } from './guards'
import { type IStopSignalInstruction, type StopSignalInstructionParams } from './types'

export class StopSignalInstruction implements IStopSignalInstruction {
    type = 'instruction' as const

    stopsignal: string | number

    public constructor(stopsignalParam: StopSignalInstructionParams) {
        if (isStopSignalNumber(stopsignalParam)) this.stopsignal = stopsignalParam
        else if (isStopSignalString(stopsignalParam))
            this.stopsignal = stopsignalParam.startsWith('SIG') ? stopsignalParam : `SIG${stopsignalParam}`
        else throw new Error(generateConstructorErrorMessage(`STOPSIGNAL`, stopsignalParam))
    }

    toString(): string {
        return ['STOPSIGNAL', this.stopsignal].join(' ')
    }
}

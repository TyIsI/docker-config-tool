import { AbstractBuildableInstruction } from '../../common/classes/instructions/buildable/class'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { isStopSignalNumber, isStopSignalString } from './guards'
import { type IStopSignalInstruction, type StopSignalInstructionParams } from './types'

export class StopSignalInstruction extends AbstractBuildableInstruction implements IStopSignalInstruction {
    type = 'instruction' as const

    instruction = 'STOPSIGNAL' as const

    stopsignal: string

    public constructor(stopsignalParam: StopSignalInstructionParams) {
        super()

        if (isStopSignalNumber(stopsignalParam)) this.stopsignal = `SIG${stopsignalParam}`
        else if (isStopSignalString(stopsignalParam))
            this.stopsignal = stopsignalParam.startsWith('SIG') ? stopsignalParam : `SIG${stopsignalParam}`
        else throw new Error(generateConstructorErrorMessage(`STOPSIGNAL`, stopsignalParam))
    }

    toString(): string {
        const output: string[] = [this.instruction]

        if (this.onBuild) output.unshift('ONBUILD')

        output.push(this.stopsignal)

        return output.join(' ')
    }
}

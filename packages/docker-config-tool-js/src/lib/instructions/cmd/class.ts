import { AbstractBuildableInstruction } from '../../common/classes/instructions/buildable/class'
import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type CmdInstructionParams, type ICmdInstruction } from './types'

export class CmdInstruction extends AbstractBuildableInstruction implements ICmdInstruction {
    type = 'instruction' as const

    instruction = 'CMD' as const

    commands: string[] = []

    public constructor(...cmdParams: CmdInstructionParams) {
        super()

        if (!isStringArray(cmdParams)) throw new Error(generateConstructorErrorMessage('CMD', cmdParams))

        this.commands = cmdParams.length === 1 ? cmdParams[0].split(' ') : cmdParams
    }

    public addCmd(cmdParam: string): this {
        if (!isString(cmdParam)) throw new Error(`Invalid cmd argument: ${typeof cmdParam} ${JSON.stringify(cmdParam)}`)

        this.commands.push(cmdParam)

        return this
    }

    public toString(): string {
        const output: string[] = [this.instruction]

        if (this.onBuild) output.unshift('ONBUILD')

        output.push(JSON.stringify(this.commands))

        return output.join(' ')
    }
}

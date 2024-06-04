import { AbstractBuildableInstruction } from '../../common/classes/instructions/buildable/class'
import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type IVolumeInstruction, type VolumeInstructionParams } from './types'

export class VolumeInstruction extends AbstractBuildableInstruction implements IVolumeInstruction {
    type = 'instruction' as const

    instruction = 'VOLUME' as const

    commands: string[] = []

    public constructor(...volumeParams: VolumeInstructionParams) {
        super()

        if (!isStringArray(volumeParams)) throw new Error(generateConstructorErrorMessage('VOLUME', volumeParams))

        this.commands = volumeParams.length === 1 ? volumeParams[0].split(' ') : volumeParams
    }

    public addVolume(volume: string): this {
        if (!isString(volume)) throw new Error(`Invalid volume argument: ${typeof volume} ${JSON.stringify(volume)}`)

        this.commands.push(volume)

        return this
    }

    public toString(): string {
        const output: string[] = [this.instruction]

        if (this.onBuild) output.unshift('ONBUILD')

        output.push(JSON.stringify(this.commands))

        return output.join(' ')
    }
}

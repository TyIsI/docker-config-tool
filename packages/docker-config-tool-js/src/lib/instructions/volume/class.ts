import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type IVolumeInstruction, type VolumeInstructionParams } from './types'

export class VolumeInstruction implements IVolumeInstruction {
    type = 'instruction' as const

    commands: string[] = []

    public constructor(...volumeParams: VolumeInstructionParams) {
        if (!isStringArray(volumeParams)) throw new Error(generateConstructorErrorMessage('VOLUME', volumeParams))

        this.commands = volumeParams.length === 1 ? volumeParams[0].split(' ') : volumeParams
    }

    public addVolume(volume: string): this {
        if (!isString(volume)) throw new Error(`Invalid volume argument: ${typeof volume} ${JSON.stringify(volume)}`)

        this.commands.push(volume)

        return this
    }

    public toString(): string {
        return ['VOLUME', JSON.stringify(this.commands)].join(' ')
    }
}

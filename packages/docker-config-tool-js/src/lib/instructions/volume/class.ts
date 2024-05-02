import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type IVolumeInstruction, type VolumeInstructionParameters } from './types'

export class VolumeInstruction implements IVolumeInstruction {
    type = 'instruction' as const

    commands: string[] = []

    public constructor(...volumes: VolumeInstructionParameters) {
        if (!isStringArray(volumes)) throw new Error(generateConstructorErrorMessage('VOLUME', volumes))

        this.commands = volumes.length === 1 ? volumes[0].split(' ') : volumes
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

import { generateInvalidArgumentErrorMessage } from '../../../../shared/utils'
import { AbstractBaseInstruction } from '../base/class'
import { type BuildableInstruction } from './types'

export abstract class AbstractBuildableInstruction extends AbstractBaseInstruction implements BuildableInstruction {
    buildable = true as const

    onBuild: boolean = false

    setOnBuild(onBuild?: boolean): void {
        if (onBuild != null && typeof onBuild !== 'boolean')
            throw new Error(generateInvalidArgumentErrorMessage(this.instruction, onBuild))

        onBuild = onBuild ?? true

        this.onBuild = onBuild
    }
}

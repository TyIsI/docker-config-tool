import { isDockerImageReference, isString } from '../../../../shared/guards'
import { isEscapeDirective, isSyntaxDirective, isValidDirective } from './guards'
import { type IDirectiveInstruction, type ValidDirectives } from './types'

export class DirectiveInstruction implements IDirectiveInstruction {
    type = 'directive' as const

    instruction = '#' as const

    directiveType: ValidDirectives
    directiveValue?: string

    public constructor(directiveType: string, directiveValue: string) {
        if (!isValidDirective(directiveType)) throw new Error(`Invalid directive type: ${String(directiveType)}`)

        this.directiveType = directiveType

        if (isSyntaxDirective(directiveType) && !isDockerImageReference(directiveValue))
            throw new Error('Invalid syntax directive value')

        if (isEscapeDirective(directiveType) && !isString(directiveValue))
            throw new Error('Invalid escape directive value')

        this.directiveValue = directiveValue
    }

    public toString(): string {
        return `# ${this.directiveType}=${this.directiveValue}`
    }
}

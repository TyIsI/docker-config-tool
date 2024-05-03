import { coerceStringArray } from '../../shared/coerce'
import { isObjectWithProperty, isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type IStage } from '../../stage/types'
import {
    isCopyInstructionChmod,
    isCopyInstructionChown,
    isCopyInstructionDestination,
    isCopyInstructionExclude,
    isCopyInstructionFrom,
    isCopyInstructionLink,
    isCopyInstructionParamObject,
    isCopyInstructionParents,
    isCopyInstructionSources
} from './guards'
import { type CopyInstructionParamObject, type CopyInstructionParams, type ICopyInstruction } from './types'
import {
    validateCopyInstructionLink,
    validateCopyInstructionParams,
    validateCopyInstructionParents
} from './validators'

export class CopyInstruction implements ICopyInstruction {
    type = 'instruction' as const

    sources: string[] = []
    destination: string = ''

    from?: string
    chown?: string
    chmod?: string
    link?: boolean
    parents?: boolean

    excludes?: string[]

    public constructor(...copyInstructionParams: CopyInstructionParams) {
        const [valid, error] = validateCopyInstructionParams(copyInstructionParams)

        if (!valid) throw new Error(generateConstructorErrorMessage(`COPY`, copyInstructionParams, error))

        if (isCopyInstructionParamObject(copyInstructionParams[0])) {
            this.hoistCopyObject(copyInstructionParams[0])
        } else if (isStringArray(copyInstructionParams)) {
            const joinedArgs = coerceStringArray(copyInstructionParams)

            this.destination = joinedArgs.splice(joinedArgs.length - 1, 1)[0]

            this.sources = joinedArgs
        }
    }

    private hoistCopyObject(copyArgs: CopyInstructionParamObject): void {
        if (isCopyInstructionSources(copyArgs.sources)) this.sources = coerceStringArray(copyArgs.sources)

        if (isCopyInstructionDestination(copyArgs.destination)) this.destination = copyArgs.destination

        if (isCopyInstructionFrom(copyArgs.from)) this.from = copyArgs.from

        if (isCopyInstructionChown(copyArgs.chown)) this.chown = copyArgs.chown

        if (isCopyInstructionChmod(copyArgs.chmod)) this.chmod = copyArgs.chmod

        if (isCopyInstructionLink(copyArgs.link)) this.link = copyArgs.link

        if (isCopyInstructionParents(copyArgs.link)) this.link = copyArgs.link

        if (isString(copyArgs.exclude)) {
            if (this.excludes == null) this.excludes = []

            this.excludes.push(copyArgs.exclude)
        }

        if (isStringArray(copyArgs.excludes)) {
            if (this.excludes != null) this.excludes = this.excludes.concat(copyArgs.excludes)
            else this.excludes = copyArgs.excludes
        }
    }

    public setFrom(from: string | IStage): this {
        if (isString(from)) this.from = from
        if (isObjectWithProperty<IStage>(from, 'id')) this.from = from.id

        return this
    }

    public setChown(chown: string): this {
        if (!isCopyInstructionChown(chown)) throw new Error(`Invalid input for setChown: ${JSON.stringify(chown)}`)

        this.chown = chown

        return this
    }

    public setChmod(chmod: string): this {
        if (!isCopyInstructionChmod(chmod)) throw new Error(`Invalid input for setChmod: ${JSON.stringify(chmod)}`)

        this.chmod = chmod

        return this
    }

    public setLink(link?: boolean): this {
        const [valid, error] = validateCopyInstructionLink(link)

        if (!valid) throw new Error(`Invalid input for setLink: ${error?.join(', ')}`)

        link = link ?? true

        this.link = link

        return this
    }

    public setLinked(): this {
        this.link = true

        return this
    }

    setParents(parents?: boolean): this {
        const [valid, error] = validateCopyInstructionParents(parents)

        if (!valid) throw new Error(`Invalid input for setParents: ${error?.join(', ')}`)

        parents = parents ?? true

        this.parents = parents

        return this
    }

    public addExclude(exclude: string): this {
        if (!isCopyInstructionExclude(exclude))
            throw new Error(`Invalid input for addExclude: "${JSON.stringify(exclude)}"`)

        if (this.excludes == null) this.excludes = []

        this.excludes.push(exclude)

        return this
    }

    public toString(): string {
        const result = ['COPY']

        if (this.from != null) result.push(`--from=${this.from}`)

        if (this.chown != null) result.push(`--chown=${this.chown}`)

        if (this.chmod != null) result.push(`--chmod=${this.chmod}`)

        if (this.link != null && this.link) result.push(`--link`)

        if (this.parents != null && this.parents) result.push(`--parents`)

        if (this.excludes != null) this.excludes.forEach((e) => result.push(`--exclude=${e}`))

        this.sources.forEach((s) => result.push(s))

        result.push(this.destination)

        return result.join(' ')
    }
}

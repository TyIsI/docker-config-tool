import { coerceStringArray } from '../../shared/coerce'
import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import {
    isAddInstructionChecksum,
    isAddInstructionChmod,
    isAddInstructionChown,
    isAddInstructionKeepGitDir,
    isAddInstructionLink,
    isAddInstructionParamObject,
    isAddInstructionSources
} from './guards'
import {
    zAddInstructionChecksum,
    zAddInstructionChmod,
    zAddInstructionChown,
    zAddInstructionExclude,
    zAddInstructionKeepGitDir,
    zAddInstructionLink
} from './schema'
import { type AddInstructionParamObject, type AddInstructionParams, type IAddInstruction } from './types'
import { validateAddInstructionParams } from './validators'

export class AddInstruction implements IAddInstruction {
    type = 'instruction' as const

    sources: string[] = []
    destination: string = ''

    keepGitDir: boolean = false
    checksum?: string
    chown?: string
    chmod?: string
    link?: boolean
    excludes?: string[]

    public constructor(...addInstructionParams: AddInstructionParams) {
        const [valid, error] = validateAddInstructionParams(addInstructionParams)

        if (!valid) {
            throw new Error(generateConstructorErrorMessage('ADD', addInstructionParams, error))
        } else if (isAddInstructionParamObject(addInstructionParams[0])) {
            this.hoistAddObject(addInstructionParams[0])
        } else if (isStringArray(addInstructionParams)) {
            const joinedArgs: string[] = addInstructionParams

            this.destination = joinedArgs.splice(joinedArgs.length - 1, 1)[0]

            this.sources = joinedArgs
        }
    }

    private hoistAddObject(addArgs: AddInstructionParamObject): void {
        if (isAddInstructionSources(addArgs.sources)) this.sources = coerceStringArray(addArgs.sources)

        if (isString(addArgs.destination)) this.destination = addArgs.destination

        if (isAddInstructionKeepGitDir(addArgs.keepGitDir)) this.keepGitDir = addArgs.keepGitDir

        if (isAddInstructionChecksum(addArgs.checksum)) this.checksum = addArgs.checksum

        if (isAddInstructionChown(addArgs.chown)) this.chown = addArgs.chown

        if (isAddInstructionChmod(addArgs.chmod)) this.chmod = addArgs.chmod

        if (isAddInstructionLink(addArgs.link)) this.link = addArgs.link

        if (isString(addArgs.exclude)) {
            if (this.excludes == null) this.excludes = []

            this.excludes.push(addArgs.exclude)
        }

        if (isStringArray(addArgs.excludes)) {
            if (this.excludes != null) this.excludes = this.excludes.concat(addArgs.excludes)
            else this.excludes = addArgs.excludes
        }
    }

    public setKeepGitDir(keepGitDir?: boolean): this {
        if (!zAddInstructionKeepGitDir.optional().safeParse(keepGitDir).success)
            throw new Error(`Invalid input for setKeepGitDir: ${JSON.stringify(keepGitDir)}`)

        keepGitDir = keepGitDir ?? true

        this.keepGitDir = keepGitDir

        return this
    }

    public setChecksum(checksum: string): this {
        if (!zAddInstructionChecksum.safeParse(checksum).success)
            throw new Error(`Invalid input for setChecksum: ${JSON.stringify(checksum)}`)

        this.checksum = checksum

        return this
    }

    public setChown(chown: string): this {
        if (!zAddInstructionChown.safeParse(chown).success)
            throw new Error(`Invalid input for setChown: ${JSON.stringify(chown)}`)

        this.chown = chown

        return this
    }

    public setChmod(chmod: string): this {
        if (!zAddInstructionChmod.safeParse(chmod).success)
            throw new Error(`Invalid input for setChmod: ${JSON.stringify(chmod)}`)

        this.chmod = chmod

        return this
    }

    public setLink(link?: boolean): this {
        if (!zAddInstructionLink.optional().safeParse(link).success)
            throw new Error(`Invalid input for setLink: ${JSON.stringify(link)}`)

        link = link ?? true

        this.link = link

        return this
    }

    public addExclude(exclude: string): this {
        if (!zAddInstructionExclude.safeParse(exclude).success)
            throw new Error(`Invalid input for addExclude: "${JSON.stringify(exclude)}"`)

        if (this.excludes == null) this.excludes = []

        this.excludes.push(exclude)

        return this
    }

    public toString(): string {
        const result = ['ADD']

        if (this.keepGitDir) result.push(`--keepGitDir`)

        if (this.checksum != null) result.push(`--checksum=${this.checksum}`)

        if (this.chown != null) result.push(`--chown=${this.chown}`)

        if (this.chmod != null) result.push(`--chmod=${this.chmod}`)

        if (this.link != null && this.link) result.push(`--link`)

        if (this.excludes != null) this.excludes.forEach((e) => result.push(`--exclude=${e}`))

        this.sources.forEach((s) => result.push(s))

        result.push(this.destination)

        return result.join(' ')
    }
}

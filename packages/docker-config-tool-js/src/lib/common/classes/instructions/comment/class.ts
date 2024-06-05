import { type ICommentInstruction } from './types'

export class CommentInstruction implements ICommentInstruction {
    type = 'comment' as const

    instruction = '#' as const

    comment?: string

    public constructor(comment: string) {
        if (typeof comment !== 'string') throw new Error('Invalid comment')

        this.comment = comment
    }

    public toString(): string {
        if (typeof this.comment !== 'string') throw new Error('Missing comment')

        return ['#', this.comment].join(' ').trim()
    }
}

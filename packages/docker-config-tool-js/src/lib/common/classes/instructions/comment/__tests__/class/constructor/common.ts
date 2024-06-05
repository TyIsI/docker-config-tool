import { CommentInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('common classes', () => {
            describe('instructions', () => {
                describe(`comments`, () => {
                    describe(`class`, () => {
                        describe(`constructor`, () => {
                            describe(`common`, () => {
                                test(`create a comment`, () => {
                                    const commentInstruction = new CommentInstruction('comment')

                                    expect(commentInstruction.toString()).toBe('# comment')
                                })

                                test(`create an empty comment`, () => {
                                    const commentInstruction = new CommentInstruction('')

                                    expect(commentInstruction.toString()).toBe('#')
                                })

                                test(`don't render with an invalid comment`, () => {
                                    expect(() => {
                                        // @ts-expect-error null
                                        const commentInstruction = new CommentInstruction(null)

                                        commentInstruction.toString()
                                    }).toThrow()
                                })

                                test(`don't render with a directly set invalid comment`, () => {
                                    expect(() => {
                                        const commentInstruction = new CommentInstruction('null')

                                        // @ts-expect-error null
                                        commentInstruction.comment = null

                                        commentInstruction.toString()
                                    }).toThrow()
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})

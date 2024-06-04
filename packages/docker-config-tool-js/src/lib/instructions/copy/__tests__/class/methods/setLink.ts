import { CopyInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`COPY`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setLink`, () => {
                            test(`create a instruction and set link without arguments`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setLink()

                                expect(copyInstruction.toString()).toBe('COPY --link . .')
                            })

                            test(`create a instruction and set link to true`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setLink(true)

                                expect(copyInstruction.toString()).toBe('COPY --link . .')
                            })

                            test(`create a instruction and set link to true and then false`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setLink(true)
                                copyInstruction.setLink(false)

                                expect(copyInstruction.toString()).toBe('COPY . .')
                            })

                            test(`create a instruction and try to set link with an invalid value`, () => {
                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    // @ts-expect-error invalid type
                                    copyInstruction.setLink('no')

                                    copyInstruction.toString()
                                }).toThrow('Invalid input for setLink: Expected boolean, received string')
                            })
                        })
                    })
                })
            })
        })
    })
})

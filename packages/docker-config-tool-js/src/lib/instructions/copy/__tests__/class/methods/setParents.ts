import { CopyInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`COPY`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setParents`, () => {
                            test(`create a instruction and set parents without arguments`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setParents()

                                expect(copyInstruction.toString()).toBe('COPY --parents . .')
                            })

                            test(`create a instruction and set parents to true`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setParents(true)

                                expect(copyInstruction.toString()).toBe('COPY --parents . .')
                            })

                            test(`create a instruction and set parents to true and then false`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setParents(true)
                                copyInstruction.setParents(false)

                                expect(copyInstruction.toString()).toBe('COPY . .')
                            })

                            test(`create a instruction and try to set parents with an invalid value`, () => {
                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    // @ts-expect-error invalid type
                                    copyInstruction.setParents('no')

                                    copyInstruction.toString()
                                }).toThrow('Invalid input for setParents: Expected boolean, received string')
                            })
                        })
                    })
                })
            })
        })
    })
})

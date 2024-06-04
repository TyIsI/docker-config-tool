import { CopyInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`COPY`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setChown`, () => {
                            test(`create a instruction and set chown with a valid uid value`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setChown('54321')

                                expect(copyInstruction.toString()).toBe('COPY --chown=54321 . .')
                            })

                            test(`create a instruction and set chown with a valid uid and gid value`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setChown('54321:54321')

                                expect(copyInstruction.toString()).toBe('COPY --chown=54321:54321 . .')
                            })

                            test(`create a instruction and set chown with an invalid string value`, () => {
                                const testChownValue =
                                    '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'

                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    copyInstruction.setChown(testChownValue)
                                }).toThrow(`Invalid input for setChown: "${testChownValue}"`)
                            })

                            test(`create a instruction and set chown with an invalid number value`, () => {
                                const testChownValue = -1

                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    // @ts-expect-error invalid type
                                    copyInstruction.setChown(testChownValue)
                                }).toThrow(`Invalid input for setChown: ${testChownValue}`)
                            })
                        })
                    })
                })
            })
        })
    })
})

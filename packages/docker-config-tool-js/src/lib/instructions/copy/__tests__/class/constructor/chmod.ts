import { CopyInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`COPY`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`chmod`, () => {
                            test(`create a instruction and set chmod with a valid value '755'`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setChmod('755')

                                copyInstruction.toString()

                                expect(copyInstruction.toString()).toBe('COPY --chmod=755 . .')
                            })

                            test(`create a instruction and set chmod with a valid '644'`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setChmod('644')

                                copyInstruction.toString()

                                expect(copyInstruction.toString()).toBe('COPY --chmod=644 . .')
                            })

                            test(`create a instruction and set chmod with an invalid string value '888'`, () => {
                                const testChmodValue = '888'

                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    copyInstruction.setChmod(testChmodValue)
                                }).toThrow(`Invalid input for setChmod: "${testChmodValue}"`)
                            })

                            test(`create a instruction and set chmod with an invalid string value '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'`, () => {
                                const testChmodValue =
                                    '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'

                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    copyInstruction.setChmod(testChmodValue)
                                }).toThrow(`Invalid input for setChmod: "${testChmodValue}"`)
                            })

                            test(`create a instruction and set chmod with an invalid number value`, () => {
                                const testChmodValue = -1

                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    // @ts-expect-error invalid type
                                    copyInstruction.setChmod(testChmodValue)
                                }).toThrow(`Invalid input for setChmod: ${testChmodValue}`)
                            })
                        })
                    })
                })
            })
        })
    })
})

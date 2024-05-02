import { AddInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ADD`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`chmod`, () => {
                            test(`create a instruction and set chmod with a valid value '755'`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setChmod('755')

                                addInstruction.toString()

                                expect(addInstruction.toString()).toBe('ADD --chmod=755 . .')
                            })

                            test(`create a instruction and set chmod with a valid value '644'`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setChmod('644')

                                addInstruction.toString()

                                expect(addInstruction.toString()).toBe('ADD --chmod=644 . .')
                            })

                            test(`create a instruction and set chmod with an invalid string value '888'`, () => {
                                const testChmodValue = '888'

                                expect(() => {
                                    const addInstruction = new AddInstruction('.', '.')

                                    addInstruction.setChmod(testChmodValue)
                                }).toThrow(`Invalid input for setChmod: "${testChmodValue}"`)
                            })

                            test(`create a instruction and set chmod with an invalid string value '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'`, () => {
                                const testChmodValue =
                                    '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'

                                expect(() => {
                                    const addInstruction = new AddInstruction('.', '.')

                                    addInstruction.setChmod(testChmodValue)
                                }).toThrow(`Invalid input for setChmod: "${testChmodValue}"`)
                            })

                            test(`create a instruction and set chmod with an invalid number value`, () => {
                                const testChmodValue = -1

                                expect(() => {
                                    const addInstruction = new AddInstruction('.', '.')

                                    // @ts-expect-error invalid type
                                    addInstruction.setChmod(testChmodValue)
                                }).toThrow(`Invalid input for setChmod: ${testChmodValue}`)
                            })
                        })
                    })
                })
            })
        })
    })
})

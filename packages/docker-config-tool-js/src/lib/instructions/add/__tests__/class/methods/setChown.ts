import { AddInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ADD`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setChown`, () => {
                            test(`create a instruction and set chown with a valid uid value`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setChown('54321')

                                expect(addInstruction.toString()).toBe('ADD --chown=54321 . .')
                            })

                            test(`create a instruction and set chown with a valid uid and gid value`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setChown('54321:54321')

                                expect(addInstruction.toString()).toBe('ADD --chown=54321:54321 . .')
                            })

                            test(`create a instruction and set chown with an invalid string value`, () => {
                                const testChownValue =
                                    '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'

                                expect(() => {
                                    const addInstruction = new AddInstruction('.', '.')

                                    addInstruction.setChown(testChownValue)
                                }).toThrow(`Invalid input for setChown: "${testChownValue}"`)
                            })

                            test(`create a instruction and set chown with an invalid number value`, () => {
                                const testChownValue = -1

                                expect(() => {
                                    const addInstruction = new AddInstruction('.', '.')

                                    // @ts-expect-error invalid type
                                    addInstruction.setChown(testChownValue)
                                }).toThrow(`Invalid input for setChown: ${testChownValue}`)
                            })
                        })
                    })
                })
            })
        })
    })
})

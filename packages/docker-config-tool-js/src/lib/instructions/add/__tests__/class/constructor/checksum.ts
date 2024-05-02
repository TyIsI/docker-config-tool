import { AddInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ADD`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`checksum`, () => {
                            test(`create a instruction and set checksum with a valid value`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setChecksum(
                                    'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
                                )

                                addInstruction.toString()

                                expect(addInstruction.toString()).toBe(
                                    'ADD --checksum=sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef . .'
                                )
                            })

                            test(`create a instruction and set checksum with an invalid string value`, () => {
                                const testChecksumValue =
                                    '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'

                                expect(() => {
                                    const addInstruction = new AddInstruction('.', '.')

                                    addInstruction.setChecksum(testChecksumValue)
                                }).toThrow(`Invalid input for setChecksum: "${testChecksumValue}"`)
                            })

                            test(`create a instruction and set checksum with an invalid number value`, () => {
                                const testChecksumValue = -1

                                expect(() => {
                                    const addInstruction = new AddInstruction('.', '.')

                                    // @ts-expect-error invalid type
                                    addInstruction.setChecksum(testChecksumValue)
                                }).toThrow(`Invalid input for setChecksum: ${testChecksumValue}`)
                            })
                        })
                    })
                })
            })
        })
    })
})

import { AddInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ADD`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setLink`, () => {
                            test(`create a instruction and set link without arguments`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setLink()

                                expect(addInstruction.toString()).toBe('ADD --link . .')
                            })

                            test(`create a instruction and set link to true`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setLink(true)

                                expect(addInstruction.toString()).toBe('ADD --link . .')
                            })

                            test(`create a instruction and set link to true and then false`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setLink(true)
                                addInstruction.setLink(false)

                                expect(addInstruction.toString()).toBe('ADD . .')
                            })

                            test(`create a instruction and try to set link with an invalid value`, () => {
                                expect(() => {
                                    const addInstruction = new AddInstruction('.', '.')

                                    // @ts-expect-error invalid type
                                    addInstruction.setLink('no')

                                    addInstruction.toString()
                                }).toThrow('Invalid input for setLink: "no"')
                            })
                        })
                    })
                })
            })
        })
    })
})

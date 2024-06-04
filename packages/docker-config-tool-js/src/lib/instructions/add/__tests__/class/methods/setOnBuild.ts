import { AddInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ADD`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`create a instruction and set onbuild without arguments`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setOnBuild()

                                expect(addInstruction.toString()).toBe('ONBUILD ADD . .')
                            })

                            test(`create a instruction and set onbuild to true`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setOnBuild(true)

                                expect(addInstruction.toString()).toBe('ONBUILD ADD . .')
                            })

                            test(`create a instruction and set onbuild to true and then false`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setOnBuild(true)
                                addInstruction.setOnBuild(false)

                                expect(addInstruction.toString()).toBe('ADD . .')
                            })

                            test(`create a instruction and try to set onbuild with an invalid value`, () => {
                                expect(() => {
                                    const addInstruction = new AddInstruction('.', '.')

                                    // @ts-expect-error invalid type
                                    addInstruction.setOnBuild('no')

                                    addInstruction.toString()
                                }).toThrow('Invalid ADD argument: string "no"')
                            })
                        })
                    })
                })
            })
        })
    })
})

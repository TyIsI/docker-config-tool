import { LabelInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`LABEL`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`create a instruction and set onbuild without arguments`, () => {
                                const labelInstruction = new LabelInstruction('TEST=test')

                                labelInstruction.setOnBuild()

                                expect(labelInstruction.toString()).toBe('ONBUILD LABEL TEST="test"')
                            })

                            test(`create a instruction and set onbuild to true`, () => {
                                const labelInstruction = new LabelInstruction('TEST=test')

                                labelInstruction.setOnBuild(true)

                                expect(labelInstruction.toString()).toBe('ONBUILD LABEL TEST="test"')
                            })

                            test(`create a instruction and set onbuild to true and then false`, () => {
                                const labelInstruction = new LabelInstruction('TEST=test')

                                labelInstruction.setOnBuild(true)
                                labelInstruction.setOnBuild(false)

                                expect(labelInstruction.toString()).toBe('LABEL TEST="test"')
                            })

                            test(`create a instruction and try to set onbuild with an invalid value`, () => {
                                expect(() => {
                                    const labelInstruction = new LabelInstruction('TEST=test')

                                    // @ts-expect-error invalid type
                                    labelInstruction.setOnBuild('no')

                                    labelInstruction.toString()
                                }).toThrow('Invalid LABEL argument: string "no"')
                            })
                        })
                    })
                })
            })
        })
    })
})

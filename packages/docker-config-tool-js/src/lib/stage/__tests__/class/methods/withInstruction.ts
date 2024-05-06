import { ArgInstruction } from '../../../../instructions/arg/class'
import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`methods`, () => {
                    describe(`withInstruction`, () => {
                        test(`create a stage from string and append a valid instruction`, () => {
                            const stage = new Stage('scratch')

                            const testInstructionObj = new ArgInstruction('TEST')

                            stage.withInstruction(testInstructionObj)

                            expect(stage).toBeTruthy()
                        })

                        test(`don't append an empty object instruction`, () => {
                            const testVal = {}
                            const stage = new Stage('scratch')

                            expect(() => {
                                stage.withInstruction(testVal)
                            }).toThrow()
                        })

                        test(`don't append an undefined instruction`, () => {
                            const stage = new Stage('scratch')

                            expect(() => {
                                // @ts-expect-error missing
                                stage.withInstruction()
                            }).toThrow('Invalid Instruction')
                        })
                    })
                })
            })
        })
    })
})

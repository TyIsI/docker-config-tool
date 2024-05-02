import { ArgInstruction } from '../../../../instructions/arg/class'
import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`methods`, () => {
                    describe(`appendInstruction`, () => {
                        test(`create a stage from string and append a valid instruction`, () => {
                            const stage = new Stage('scratch')

                            const createARG = new ArgInstruction('TEST')

                            stage.appendInstruction(createARG)

                            expect(stage).toBeTruthy()
                        })

                        test(`don't append an empty object instruction`, () => {
                            const testVal = {}
                            const stage = new Stage('scratch')

                            expect(() => {
                                stage.appendInstruction(testVal)
                            }).toThrow()
                        })

                        test(`don't append an undefined instruction`, () => {
                            const stage = new Stage('scratch')

                            expect(() => {
                                // @ts-expect-error missing
                                stage.appendInstruction()
                            }).toThrow('Invalid Instruction')
                        })
                    })
                })
            })
        })
    })
})

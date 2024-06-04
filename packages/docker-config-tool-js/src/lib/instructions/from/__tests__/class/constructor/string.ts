import { generateTestImages } from '../../../../../../__utils__/images'
import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { FromInstruction } from '../../../class'

const testCases = generateTestImages()

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`instructions`, () => {
            describe(`FROM`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`string`, () => {
                            test(`create instruction from strings`, () => {
                                testCases.forEach((testCase) => {
                                    const fromInstruction = new FromInstruction(testCase)

                                    expect(fromInstruction.toString()).toBe(`FROM ${testCase}`)
                                })
                            })

                            test(`don't create with empty string`, () => {
                                expect(() => {
                                    const fromInstruction = new FromInstruction('')

                                    fromInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage(`FROM`, ''))
                            })

                            test(`don't create with an off spec string`, () => {
                                expect(() => {
                                    const fromInstruction = new FromInstruction(`1`)

                                    fromInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage(`FROM`, `1`))
                            })
                        })
                    })
                })
            })
        })
    })
})

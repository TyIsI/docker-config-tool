import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { FromInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`FROM`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`base`, () => {
                            test(`don't create with empty argument`, () => {
                                expect(() => {
                                    // @ts-expect-error empty argument
                                    const fromInstruction = new FromInstruction()

                                    fromInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('FROM', undefined))
                            })

                            test(`don't create with empty object argument`, () => {
                                expect(() => {
                                    // @ts-expect-error invalid object
                                    const fromInstruction = new FromInstruction({})

                                    fromInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('FROM', {}))
                            })
                        })
                    })
                })
            })
        })
    })
})

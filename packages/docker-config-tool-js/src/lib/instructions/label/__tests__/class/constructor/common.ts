import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { LabelInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`LABEL`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`common`, () => {
                            test(`create with simple string argument`, () => {
                                const labelInstruction = new LabelInstruction('com.example.label=test')

                                expect(labelInstruction.toString()).toMatch('LABEL com.example.label="test"')
                            })

                            test(`create with string array argument`, () => {
                                const labelInstruction = new LabelInstruction(['com.example.label=test'])

                                expect(labelInstruction.toString()).toMatch('LABEL com.example.label="test"')
                            })

                            test(`create with object argument`, () => {
                                const labelInstruction = new LabelInstruction({ 'com.example.label': 'test' })

                                expect(labelInstruction.toString()).toMatch('LABEL com.example.label="test"')
                            })

                            test(`create with object argument and add label`, () => {
                                const labelInstruction = new LabelInstruction({ 'com.example.label': 'test' })

                                labelInstruction.addLabel('com.example.debug=true')

                                expect(labelInstruction.toString()).toMatch(
                                    'LABEL com.example.label="test" com.example.debug="true"'
                                )
                            })

                            test(`don't create object`, () => {
                                expect(() => {
                                    // @ts-expect-error empty
                                    const labelInstruction = new LabelInstruction()

                                    labelInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('LABEL', undefined))
                            })

                            test(`don't add invalid label`, () => {
                                expect(() => {
                                    const labelInstruction = new LabelInstruction('com.example.label=test')

                                    // @ts-expect-error invalid argument
                                    labelInstruction.addLabel(null)

                                    labelInstruction.toString()
                                }).toThrow('Invalid label argument')
                            })
                        })
                    })
                })
            })
        })
    })
})

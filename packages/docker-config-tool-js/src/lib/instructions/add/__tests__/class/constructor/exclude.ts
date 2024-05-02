import { AddInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ADD`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`exclude`, () => {
                            test(`create a instruction and set exclude with a valid value '.git'`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.addExclude('.git')

                                addInstruction.toString()

                                expect(addInstruction.toString()).toBe('ADD --exclude=.git . .')
                            })

                            test(`create a instruction and set exclude with multiple valid values '.git node_modules'`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.addExclude('.git')
                                addInstruction.addExclude('node_modules')

                                addInstruction.toString()

                                expect(addInstruction.toString()).toBe('ADD --exclude=.git --exclude=node_modules . .')
                            })

                            test(`create a instruction and set exclude with an invalid numeric value '888'`, () => {
                                const testExcludeValue = 888

                                expect(() => {
                                    const addInstruction = new AddInstruction('.', '.')

                                    // @ts-expect-error wrong type
                                    addInstruction.addExclude(testExcludeValue)
                                }).toThrow(`Invalid input for addExclude: "${testExcludeValue}"`)
                            })
                        })
                    })
                })
            })
        })
    })
})

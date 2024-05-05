import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { RunInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`base`, () => {
                            test(`create from string`, () => {
                                const runInstruction = new RunInstruction('apt update')

                                expect(runInstruction.toString()).toMatch('RUN apt update')
                            })

                            test(`create from strings`, () => {
                                const runInstruction = new RunInstruction('apt', 'update')

                                expect(runInstruction.toString()).toMatch('RUN apt update')
                            })

                            test(`create from string array`, () => {
                                const runInstruction = new RunInstruction(['apt', 'update'])

                                expect(runInstruction.toString()).toMatch('RUN apt update')
                            })

                            test(`create from object with string commands`, () => {
                                const runInstruction = new RunInstruction({ commands: 'apt update' })

                                expect(runInstruction.toString()).toMatch('RUN apt update')
                            })

                            test(`create from object with commands array`, () => {
                                const runInstruction = new RunInstruction({ commands: ['apt', 'update'] })

                                expect(runInstruction.toString()).toMatch('RUN apt update')
                            })

                            test(`don't create with empty argument`, () => {
                                const testVal = undefined

                                expect(() => {
                                    // @ts-expect-error empty argument
                                    const runInstruction = new RunInstruction(testVal)

                                    runInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('RUN', [testVal], ['Invalid input']))
                            })

                            test(`don't create with empty string argument`, () => {
                                const testVal = ''

                                expect(() => {
                                    const runInstruction = new RunInstruction(testVal)

                                    runInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('RUN', [testVal], ['Invalid string input']))
                            })

                            test(`don't create with empty array argument`, () => {
                                const testVal: string[] = []

                                expect(() => {
                                    // @ts-expect-error not assignable
                                    const runInstruction = new RunInstruction(testVal)

                                    runInstruction.toString()
                                }).toThrow(
                                    generateConstructorErrorMessage(
                                        'RUN',
                                        [[]],
                                        ['Array must contain at least 1 element(s)']
                                    )
                                )
                            })

                            test(`don't create with array argument with empty string`, () => {
                                const testVal = ['']

                                expect(() => {
                                    // @ts-expect-error not assignable
                                    const runInstruction = new RunInstruction(testVal)

                                    runInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('RUN', [testVal]))
                            })

                            test(`don't create with empty object argument`, () => {
                                const testVal = {}

                                expect(() => {
                                    // @ts-expect-error empty object argument
                                    const runInstruction = new RunInstruction(testVal)

                                    runInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('RUN', [testVal]))
                            })
                        })
                    })
                })
            })
        })
    })
})

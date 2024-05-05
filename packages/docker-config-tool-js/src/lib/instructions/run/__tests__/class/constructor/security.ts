import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { RunInstruction } from '../../../class'
import { type RunInstructionParamsObject } from '../../../types'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`security`, () => {
                            test(`create with sandbox security option`, () => {
                                const testVal: RunInstructionParamsObject = {
                                    commands: ['apt', 'update'],
                                    security: 'sandbox'
                                }

                                const runInstruction = new RunInstruction(testVal)

                                expect(runInstruction.toString()).toMatch('RUN --security=sandbox apt update')
                            })

                            test(`create with insecure security option`, () => {
                                const testVal: RunInstructionParamsObject = {
                                    commands: ['apt', 'update'],
                                    security: 'insecure'
                                }

                                const runInstruction = new RunInstruction(testVal)

                                expect(runInstruction.toString()).toMatch('RUN --security=insecure apt update')
                            })

                            test(`don't create with invalid security option`, () => {
                                const testVal: RunInstructionParamsObject = {
                                    commands: ['echo', 'test'],
                                    // @ts-expect-error invalid
                                    security: 'invalid'
                                }

                                expect(() => {
                                    const runInstruction = new RunInstruction(testVal)

                                    runInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('RUN', testVal))
                            })

                            test(`don't create with a null security option`, () => {
                                const testVal: RunInstructionParamsObject = {
                                    commands: ['echo', 'test'],
                                    // @ts-expect-error null
                                    security: null
                                }

                                expect(() => {
                                    const runInstruction = new RunInstruction(testVal)

                                    runInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('RUN', testVal))
                            })
                        })
                    })
                })
            })
        })
    })
})

import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { RunInstruction } from '../../../class'
import { type RunInstructionParamsObject } from '../../../types'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`network`, () => {
                            test(`create run instruction, with network option 'default'`, () => {
                                const testVal: RunInstructionParamsObject = {
                                    commands: ['apt', 'update'],
                                    network: 'default'
                                }

                                const runInstruction = new RunInstruction(testVal)

                                expect(runInstruction.toString()).toMatch('RUN --network=default apt update')
                            })

                            test(`create run instruction, with network option 'none'`, () => {
                                const testVal: RunInstructionParamsObject = {
                                    commands: ['apt', 'update'],
                                    network: 'none'
                                }

                                const runInstruction = new RunInstruction(testVal)

                                expect(runInstruction.toString()).toMatch('RUN --network=none apt update')
                            })

                            test(`create run instruction, with network option 'host'`, () => {
                                const testVal: RunInstructionParamsObject = {
                                    commands: ['apt', 'update'],
                                    network: 'host'
                                }

                                const runInstruction = new RunInstruction(testVal)

                                expect(runInstruction.toString()).toMatch('RUN --network=host apt update')
                            })

                            test(`don't create run instruction, with network option: invalid`, () => {
                                const testVal: RunInstructionParamsObject = {
                                    commands: ['echo', 'test'],
                                    // @ts-expect-error invalid
                                    network: 'invalid'
                                }

                                expect(() => {
                                    const runInstruction = new RunInstruction(testVal)

                                    runInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('RUN', [testVal], ['Invalid input']))
                            })

                            test(`don't create run instruction, with network option: null`, () => {
                                const testVal: RunInstructionParamsObject = {
                                    commands: ['echo', 'test'],
                                    // @ts-expect-error null
                                    network: null
                                }

                                expect(() => {
                                    const runInstruction = new RunInstruction(testVal)

                                    runInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('RUN', [testVal], ['Invalid input']))
                            })
                        })
                    })
                })
            })
        })
    })
})

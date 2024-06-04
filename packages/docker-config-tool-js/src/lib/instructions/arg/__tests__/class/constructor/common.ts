import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { ArgInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ARG`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`common`, () => {
                            test(`create a instruction with a simple ARG value`, () => {
                                const argInstruction = new ArgInstruction('TEST')

                                expect(argInstruction.toString()).toBe('ARG TEST')
                            })

                            test(`create a instruction with an assigned ARG value`, () => {
                                const argInstruction = new ArgInstruction('TEST=test')

                                expect(argInstruction.toString()).toBe('ARG TEST=test')
                            })

                            test(`creating a instruction with a parameter object`, () => {
                                const argInstruction = new ArgInstruction({ name: 'TEST', value: 'test' })

                                expect(argInstruction.toString()).toBe('ARG TEST=test')
                            })

                            test(`creating a instruction with a parameter object with no value`, () => {
                                const argInstruction = new ArgInstruction({ name: 'TEST' })

                                expect(argInstruction.toString()).toBe('ARG TEST')
                            })

                            test(`don't create with missing arguments`, () => {
                                expect(() => {
                                    // @ts-expect-error empty arguments
                                    const argInstruction = new ArgInstruction()

                                    argInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('ARG', undefined))
                            })

                            test(`don't create with empty string argument`, () => {
                                expect(() => {
                                    const argInstruction = new ArgInstruction('')

                                    argInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage(`ARG`, ''))
                            })

                            test(`don't create with half-assignment`, () => {
                                const testVal = 'TEST='

                                expect(() => {
                                    const argInstruction = new ArgInstruction(testVal)

                                    argInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('ARG', testVal))
                            })
                        })
                    })
                })
            })
        })
    })
})

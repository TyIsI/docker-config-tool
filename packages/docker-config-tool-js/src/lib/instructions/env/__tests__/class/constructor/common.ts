import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { EnvInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ENV`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`common`, () => {
                            test(`create a instruction with a simple value`, () => {
                                const envInstruction = new EnvInstruction('TEST=test')

                                expect(envInstruction.toString()).toBe('ENV TEST=test')
                            })

                            test(`create a instruction with an array value`, () => {
                                const envInstruction = new EnvInstruction(['TEST=test'])

                                expect(envInstruction.toString()).toBe('ENV TEST=test')
                            })

                            test(`create a instruction with an array value`, () => {
                                const envInstruction = new EnvInstruction(['TEST1=test1', 'TEST2=test2'])

                                expect(envInstruction.toString()).toBe('ENV TEST1=test1 TEST2=test2')
                            })

                            test(`create a instruction with an array value and spaces in the values`, () => {
                                const envInstruction = new EnvInstruction(['TEST1=test 1', 'TEST2=test 2'])

                                expect(envInstruction.toString()).toBe('ENV TEST1="test 1" TEST2="test 2"')
                            })

                            test(`create a instruction with a parameter object`, () => {
                                const envInstruction = new EnvInstruction({ TEST: 'test' })

                                expect(envInstruction.toString()).toBe('ENV TEST=test')
                            })

                            test(`create a instruction with a parameter object with multiple keys with spaces`, () => {
                                const envInstruction = new EnvInstruction({ TEST1: 'test 1', TEST2: 'test 2' })

                                expect(envInstruction.toString()).toBe('ENV TEST1="test 1" TEST2="test 2"')
                            })

                            test(`creating a instruction with a parameter object and add a variable`, () => {
                                const envInstruction = new EnvInstruction({ TEST: 'test' })

                                envInstruction.addEnv('DEBUG', '*')

                                expect(envInstruction.toString()).toBe('ENV TEST=test DEBUG=*')
                            })

                            test(`create a instruction with an empty string parameter`, () => {
                                expect(() => {
                                    const envInstruction = new EnvInstruction('')

                                    envInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('ENV', ''))
                            })

                            test(`create a instruction with an empty array parameter`, () => {
                                expect(() => {
                                    const envInstruction = new EnvInstruction([])

                                    envInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('ENV', []))
                            })

                            test(`create a instruction with an empty object`, () => {
                                expect(() => {
                                    const envInstruction = new EnvInstruction({})

                                    envInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('ENV', {}))
                            })

                            test(`create a instruction with an invalid string parameter`, () => {
                                expect(() => {
                                    const envInstruction = new EnvInstruction('-1')

                                    envInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('ENV', '-1'))
                            })

                            test(`create a instruction with an invalid string assignment`, () => {
                                expect(() => {
                                    const envInstruction = new EnvInstruction('TEST=')

                                    envInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('ENV', 'TEST='))
                            })

                            test(`create a instruction with a numeric parameter`, () => {
                                expect(() => {
                                    // @ts-expect-error wrong type
                                    const envInstruction = new EnvInstruction(-1)

                                    envInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('ENV', -1))
                            })

                            test(`create a instruction with a null parameter`, () => {
                                expect(() => {
                                    // @ts-expect-error wrong type
                                    const envInstruction = new EnvInstruction(null)

                                    envInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('ENV', null))
                            })

                            test(`create a instruction with an invalid array parameter`, () => {
                                expect(() => {
                                    // @ts-expect-error wrong type
                                    const envInstruction = new EnvInstruction([-1])

                                    envInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('ENV', [-1]))
                            })
                        })
                    })
                })
            })
        })
    })
})

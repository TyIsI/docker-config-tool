import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { UserInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`USER`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`numeric argument`, () => {
                            test(`create with numeric uid`, () => {
                                const userInstruction = new UserInstruction(123)

                                expect(userInstruction.toString()).toMatch('USER 123')
                            })

                            test(`create with numeric uid and gid`, () => {
                                const userInstruction = new UserInstruction(123, 123)

                                expect(userInstruction.toString()).toMatch('USER 123:123')
                            })

                            test(`create with object with uid and gid `, () => {
                                const userInstruction = new UserInstruction({ uid: 123 })

                                expect(userInstruction.toString()).toMatch('USER 123')
                            })

                            test(`create with object with uid and gid `, () => {
                                const userInstruction = new UserInstruction({ uid: 123, gid: 123 })

                                expect(userInstruction.toString()).toMatch('USER 123:123')
                            })
                        })

                        describe(`string argument`, () => {
                            test(`create with string uid`, () => {
                                const userInstruction = new UserInstruction('123')

                                expect(userInstruction.toString()).toMatch('USER 123')
                            })

                            test(`create with uid and gid strings`, () => {
                                const userInstruction = new UserInstruction('123', '123')

                                expect(userInstruction.toString()).toMatch('USER 123:123')
                            })

                            test(`create with string with uid and gid `, () => {
                                const userInstruction = new UserInstruction('123:123')

                                expect(userInstruction.toString()).toMatch('USER 123:123')
                            })
                        })

                        describe(`object argument`, () => {
                            test(`create with object with uid and gid `, () => {
                                const userInstruction = new UserInstruction({ uid: '123' })

                                expect(userInstruction.toString()).toMatch('USER 123')
                            })

                            test(`create with object with uid and gid `, () => {
                                const userInstruction = new UserInstruction({ uid: '123', gid: '123' })

                                expect(userInstruction.toString()).toMatch('USER 123:123')
                            })
                        })

                        describe(`array argument`, () => {
                            test(`create with array with numeric uid`, () => {
                                const userInstruction = new UserInstruction([123])

                                expect(userInstruction.toString()).toMatch('USER 123')
                            })

                            test(`create with array with string uid`, () => {
                                const userInstruction = new UserInstruction(['123'])

                                expect(userInstruction.toString()).toMatch('USER 123')
                            })

                            test(`create with object with numeric uid and gid `, () => {
                                const userInstruction = new UserInstruction([123, 123])

                                expect(userInstruction.toString()).toMatch('USER 123:123')
                            })

                            test(`create with object with string uid and gid `, () => {
                                const userInstruction = new UserInstruction(['123', '123'])

                                expect(userInstruction.toString()).toMatch('USER 123:123')
                            })
                        })

                        describe(`edge cases`, () => {
                            test(`do not create with undefined argument`, () => {
                                const testVal = undefined

                                expect(() => {
                                    // @ts-expect-error undefined
                                    const userInstruction = new UserInstruction(testVal)

                                    userInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('USER', [testVal], ['Invalid input']))
                            })

                            test(`do not create with invalid string argument`, () => {
                                const testVal = 'invalid:'

                                expect(() => {
                                    const userInstruction = new UserInstruction(testVal)

                                    userInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('USER', [testVal], ['invalid:']))
                            })

                            test(`do not create with out of spec uid argument`, () => {
                                const testVal = 87654

                                expect(() => {
                                    const userInstruction = new UserInstruction(testVal)

                                    userInstruction.toString()
                                }).toThrow(
                                    generateConstructorErrorMessage(
                                        'USER',
                                        [testVal],
                                        ['Number must be less than or equal to 65535']
                                    )
                                )
                            })

                            test(`do not create with asymetric out of spec gid argument`, () => {
                                const testVal1 = 321
                                const testVal2 = 87654

                                expect(() => {
                                    const userInstruction = new UserInstruction(testVal1, testVal2)

                                    userInstruction.toString()
                                }).toThrow(
                                    generateConstructorErrorMessage(
                                        'USER',
                                        [testVal1, testVal2],
                                        ['Number must be less than or equal to 65535']
                                    )
                                )
                            })

                            test(`do not create with asymetric out of spec gid string argument`, () => {
                                const testVal1 = 321
                                const testVal2 = '87654'

                                expect(() => {
                                    const userInstruction = new UserInstruction(testVal1, testVal2)

                                    userInstruction.toString()
                                }).toThrow(
                                    generateConstructorErrorMessage(
                                        'USER',
                                        [testVal1, testVal2],
                                        ['Number must be less than or equal to 65535']
                                    )
                                )
                            })

                            test(`do not create with asymetric arguments`, () => {
                                const testVal1 = undefined
                                const testVal2 = 123

                                const testResult = ['Invalid input']

                                expect(() => {
                                    // @ts-expect-error undefined
                                    const userInstruction = new UserInstruction(testVal1, testVal2)

                                    userInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('USER', [testVal1, testVal2], testResult))
                            })

                            test(`do not create with asymetric object arguments`, () => {
                                const testVal = { uid: undefined, gid: 123 }
                                const testResult = ['Invalid input']

                                expect(() => {
                                    // @ts-expect-error undefined
                                    const userInstruction = new UserInstruction(testVal)

                                    userInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('USER', [testVal], testResult))
                            })

                            test(`do not create with out of spec object arguments`, () => {
                                const testVal = { uid: 87654, gid: 87654 }

                                expect(() => {
                                    const userInstruction = new UserInstruction(testVal)

                                    userInstruction.toString()
                                }).toThrow(
                                    generateConstructorErrorMessage(
                                        'USER',
                                        [testVal],
                                        [
                                            'Number must be less than or equal to 65535',
                                            'Number must be less than or equal to 65535'
                                        ]
                                    )
                                )
                            })

                            test(`do not create with object arguments and gid arguments`, () => {
                                const testVal = { uid: 'test', gid: 'test' }

                                expect(() => {
                                    // @ts-expect-error too many args... too many args.
                                    const userInstruction = new UserInstruction(testVal, 'test')

                                    userInstruction.toString()
                                }).toThrow(
                                    generateConstructorErrorMessage(
                                        'USER',
                                        [testVal, 'test'],
                                        ['Array must contain at most 1 element(s)', 'Invalid input', 'Invalid input']
                                    )
                                )
                            })
                        })
                    })
                })
            })
        })
    })
})

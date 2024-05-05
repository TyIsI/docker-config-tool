import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { ExposeInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`EXPOSE`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        test(`create instruction with simple numeric parameter`, () => {
                            const exposeInstruction = new ExposeInstruction(3000)

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp')
                        })

                        test(`create instruction with simple string parameter`, () => {
                            const exposeInstruction = new ExposeInstruction('3000')

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp')
                        })

                        test(`create instruction with port and protocol string parameter (tcp)`, () => {
                            const exposeInstruction = new ExposeInstruction('3000/tcp')

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp')
                        })

                        test(`create instruction with port and protocol string parameter (udp)`, () => {
                            const exposeInstruction = new ExposeInstruction('3000/udp')

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/udp')
                        })

                        test(`create instruction with multiple numeric parameters`, () => {
                            const exposeInstruction = new ExposeInstruction(3000, 6001)

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp 6001/tcp')
                        })

                        test(`create instruction with multiple string parameters`, () => {
                            const exposeInstruction = new ExposeInstruction('3000/tcp', '6001/udp')

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp 6001/udp')
                        })

                        test(`create instruction with simple array parameter`, () => {
                            const exposeInstruction = new ExposeInstruction([3000])

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp')
                        })

                        test(`create instruction with tupled tcp array parameter`, () => {
                            const exposeInstruction = new ExposeInstruction([3000, 'tcp'])

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp')
                        })

                        test(`create instruction with tupled udp array parameter`, () => {
                            const exposeInstruction = new ExposeInstruction([3000, 'udp'])

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/udp')
                        })

                        test(`create instruction with simple port number object parameter`, () => {
                            const exposeInstruction = new ExposeInstruction({ port: 3000 })

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp')
                        })

                        test(`create instruction with simple port string object parameter`, () => {
                            const exposeInstruction = new ExposeInstruction({ port: '3000' })

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp')
                        })

                        test(`create instruction with numeric port and tcp proto object parameter`, () => {
                            const exposeInstruction = new ExposeInstruction({ port: 3000, proto: 'tcp' })

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp')
                        })

                        test(`create instruction with string port and tcp proto object parameter`, () => {
                            const exposeInstruction = new ExposeInstruction({ port: '3000', proto: 'tcp' })

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp')
                        })

                        test(`create instruction with numeric port and udp proto object parameter`, () => {
                            const exposeInstruction = new ExposeInstruction({ port: 3000, proto: 'udp' })

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/udp')
                        })

                        test(`create instruction with string port and udp proto object parameter`, () => {
                            const exposeInstruction = new ExposeInstruction({ port: '3000', proto: 'udp' })

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/udp')
                        })

                        test(`create instruction with simple numeric parameter and then add an additional port`, () => {
                            const exposeInstruction = new ExposeInstruction(3000)

                            exposeInstruction.addExposeParam(6001)

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp 6001/tcp')
                        })

                        test(`create instruction with simple string parameter and then add an additional port`, () => {
                            const exposeInstruction = new ExposeInstruction('3000')

                            exposeInstruction.addExposeParam('6001')

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp 6001/tcp')
                        })

                        test(`create instruction with port and protocol string (tcp) parameter and then add an additional port`, () => {
                            const exposeInstruction = new ExposeInstruction('3000/tcp')

                            exposeInstruction.addExposeParam('6001/tcp')

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/tcp 6001/tcp')
                        })

                        test(`create instruction with port and protocol string (udp) parameter and then add an additional port`, () => {
                            const exposeInstruction = new ExposeInstruction('3000/udp')

                            exposeInstruction.addExposeParam('6001/udp')

                            expect(exposeInstruction.toString()).toBe('EXPOSE 3000/udp 6001/udp')
                        })

                        test(`don't create with empty parameters`, () => {
                            expect(() => {
                                const envInstruction = new ExposeInstruction()

                                envInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('EXPOSE', []))
                        })

                        test(`don't create with out of spec numeric port`, () => {
                            const testVal = [87654]

                            expect(() => {
                                const envInstruction = new ExposeInstruction(...testVal)

                                envInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('EXPOSE', testVal))
                        })

                        test(`don't create with out of spec string port`, () => {
                            const testVal = ['87654']

                            expect(() => {
                                const envInstruction = new ExposeInstruction(...testVal)

                                envInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('EXPOSE', testVal))
                        })

                        test(`don't create with out of spec protocol`, () => {
                            const testVal = ['3000/invalid']

                            expect(() => {
                                const envInstruction = new ExposeInstruction(...testVal)

                                envInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('EXPOSE', testVal))
                        })

                        test(`don't create with an array with an out of spec port`, () => {
                            const testVal = [['87654']]

                            expect(() => {
                                // @ts-expect-error out of spec
                                const envInstruction = new ExposeInstruction(...testVal)

                                envInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('EXPOSE', testVal))
                        })

                        test(`don't create with out of spec protocol array`, () => {
                            const testVal = [['3000/invalid']]

                            expect(() => {
                                // @ts-expect-error out of spec
                                const envInstruction = new ExposeInstruction(...testVal)

                                envInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('EXPOSE', testVal))
                        })

                        test(`don't create with an object with missspelled port field`, () => {
                            const testVal = [{ prot: '3000' }]

                            expect(() => {
                                // @ts-expect-error missspelled field
                                const envInstruction = new ExposeInstruction(...testVal)

                                envInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('EXPOSE', testVal))
                        })

                        test(`don't create with an object with missspelled proto field with a good value`, () => {
                            const testVal = [{ porto: 'tcp' }]

                            expect(() => {
                                // @ts-expect-error missspelled field
                                const envInstruction = new ExposeInstruction(...testVal)

                                envInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('EXPOSE', testVal))
                        })

                        test(`don't create with an object with missspelled proto field with an invalid value`, () => {
                            const testVal = [{ porto: 'invalid' }]

                            expect(() => {
                                // @ts-expect-error missspelled field
                                const envInstruction = new ExposeInstruction(...testVal)

                                envInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('EXPOSE', testVal))
                        })

                        test(`don't create with an object with proto field with an invalid value`, () => {
                            const testVal = [{ proto: 'invalid' }]

                            expect(() => {
                                // @ts-expect-error missspelled field
                                const envInstruction = new ExposeInstruction(...testVal)

                                envInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('EXPOSE', testVal))
                        })

                        test(`don't add a port with empty parameters`, () => {
                            expect(() => {
                                const envInstruction = new ExposeInstruction(3000)

                                // @ts-expect-error missing port
                                envInstruction.addExposeParam()

                                envInstruction.toString()
                            }).toThrow(/^Invalid parameter value for addExposeArg/)
                        })

                        test(`don't add a port with out of spec numeric port`, () => {
                            const testVal = 87654

                            expect(() => {
                                const envInstruction = new ExposeInstruction(3000)

                                envInstruction.addExposeParam(testVal)

                                envInstruction.toString()
                            }).toThrow(/^Invalid parameter value for addExposeArg/)
                        })

                        test(`don't add a port with out of spec string port`, () => {
                            const testVal = '87654'

                            expect(() => {
                                const envInstruction = new ExposeInstruction(3000)

                                envInstruction.addExposeParam(testVal)

                                envInstruction.toString()
                            }).toThrow(/^Invalid parameter value for addExposeArg/)
                        })

                        test(`don't add a port with out of spec protocol`, () => {
                            const testVal = '3000/invalid'

                            expect(() => {
                                const envInstruction = new ExposeInstruction(3000)

                                envInstruction.addExposeParam(testVal)

                                envInstruction.toString()
                            }).toThrow(/^Invalid parameter value for addExposeArg/)
                        })
                    })
                })
            })
        })
    })
})

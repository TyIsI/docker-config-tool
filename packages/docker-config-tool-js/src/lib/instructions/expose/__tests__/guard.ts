import { type ExposePortDefinition } from '../types'
import { coerceExposeDefinition } from '../utils'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`EXPOSE`, () => {
                describe(`guards`, () => {
                    describe(`coerceExposeDefinition`, () => {
                        test(`passes on numeric value`, () => {
                            const testVal = 80
                            const resultVal: ExposePortDefinition = { port: 80, proto: 'tcp' }

                            expect(coerceExposeDefinition(testVal)).toMatchObject(resultVal)
                        })

                        test(`passes on string value`, () => {
                            const testVal = '80'
                            const resultVal: ExposePortDefinition = { port: 80, proto: 'tcp' }

                            expect(coerceExposeDefinition(testVal)).toMatchObject(resultVal)
                        })

                        test(`passes on str/tcp value`, () => {
                            const testVal = '80/tcp'
                            const resultVal: ExposePortDefinition = { port: 80, proto: 'tcp' }

                            expect(coerceExposeDefinition(testVal)).toMatchObject(resultVal)
                        })

                        test(`passes on str/udp value`, () => {
                            const testVal = '80/udp'
                            const resultVal: ExposePortDefinition = { port: 80, proto: 'udp' }

                            expect(coerceExposeDefinition(testVal)).toMatchObject(resultVal)
                        })

                        test(`passes on numeric/tcp tuple value`, () => {
                            const testVal = [80, 'tcp']
                            const resultVal: ExposePortDefinition = { port: 80, proto: 'tcp' }

                            expect(coerceExposeDefinition(testVal)).toMatchObject(resultVal)
                        })

                        test(`passes on numeric/udp tuple value`, () => {
                            const testVal = [80, 'udp']
                            const resultVal: ExposePortDefinition = { port: 80, proto: 'udp' }

                            expect(coerceExposeDefinition(testVal)).toMatchObject(resultVal)
                        })

                        test(`passes on string/tcp tuple value`, () => {
                            const testVal = ['80', 'tcp']
                            const resultVal: ExposePortDefinition = { port: 80, proto: 'tcp' }

                            expect(coerceExposeDefinition(testVal)).toMatchObject(resultVal)
                        })

                        test(`passes on string/udp tuple value`, () => {
                            const testVal = ['80', 'udp']
                            const resultVal: ExposePortDefinition = { port: 80, proto: 'udp' }

                            expect(coerceExposeDefinition(testVal)).toMatchObject(resultVal)
                        })

                        test(`passes on numeric/tcp object value`, () => {
                            const testVal = { port: 80, proto: 'tcp' }
                            const resultVal: ExposePortDefinition = { port: 80, proto: 'tcp' }

                            expect(coerceExposeDefinition(testVal)).toMatchObject(resultVal)
                        })

                        test(`passes on numeric/udp object value`, () => {
                            const testVal = { port: 80, proto: 'udp' }
                            const resultVal: ExposePortDefinition = { port: 80, proto: 'udp' }

                            expect(coerceExposeDefinition(testVal)).toMatchObject(resultVal)
                        })

                        test(`passes on string/tcp object value`, () => {
                            const testVal = { port: '80', proto: 'tcp' }
                            const resultVal: ExposePortDefinition = { port: 80, proto: 'tcp' }

                            expect(coerceExposeDefinition(testVal)).toMatchObject(resultVal)
                        })

                        test(`passes on string/udp object value`, () => {
                            const testVal = { port: '80', proto: 'udp' }
                            const resultVal: ExposePortDefinition = { port: 80, proto: 'udp' }

                            expect(coerceExposeDefinition(testVal)).toMatchObject(resultVal)
                        })

                        test(`should fail on null value`, () => {
                            const testVal = null

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on out of spec numeric value`, () => {
                            const testVal = 87654

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on out of spec string value`, () => {
                            const testVal = '87654'

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on incomplete string tuple value`, () => {
                            const testVal = '12345/'

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on invalid string tuple value`, () => {
                            const testVal = '12345/invalid'

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on out of spec numeric tuple value`, () => {
                            const testVal = ['87654']

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on out of spec numeric tuple value`, () => {
                            const testVal = ['12345', 'invalid']

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on string tuple value with missing protocol`, () => {
                            const testVal = ['12345', '']

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on object with empty port string`, () => {
                            const testVal = { port: '' }

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on object with out of spec port string`, () => {
                            const testVal = { port: '' }

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on object with out of lower bound port number`, () => {
                            const testVal = { port: -1 }

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on object with out of upper bound port number`, () => {
                            const testVal = { port: 87654 }

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on object with out of lower bound port string`, () => {
                            const testVal = { port: '-1' }

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on object with out of upper bound port string`, () => {
                            const testVal = { port: '87654' }

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on object with valid numeric port and empty protocol`, () => {
                            const testVal = { port: 12345, proto: '' }

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on object with valid string port and empty protocol`, () => {
                            const testVal = { port: '12345', proto: '' }

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on object with valid numeric port and invalid protocol`, () => {
                            const testVal = { port: '12345', proto: 'invalid' }

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })

                        test(`should fail on object with valid string port and invalid protocol`, () => {
                            const testVal = { port: '12345', proto: 'invalid' }

                            expect(() => coerceExposeDefinition(testVal)).toThrow('non-coerceable value')
                        })
                    })
                })
            })
        })
    })
})

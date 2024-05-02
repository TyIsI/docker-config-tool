import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { StopSignalInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`STOPSIGNAL`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        test(`create from number`, () => {
                            const stopSignalInstruction = new StopSignalInstruction(1)

                            expect(stopSignalInstruction.toString()).toMatch('STOPSIGNAL 1')
                        })

                        test(`create from long form string`, () => {
                            const stopSignalInstruction = new StopSignalInstruction('SIGHUP')

                            expect(stopSignalInstruction.toString()).toMatch('STOPSIGNAL SIGHUP')
                        })

                        test(`create from short form string`, () => {
                            const stopSignalInstruction = new StopSignalInstruction('HUP')

                            expect(stopSignalInstruction.toString()).toMatch('STOPSIGNAL SIGHUP')
                        })

                        test(`don't create from undefined argument`, () => {
                            const testVal = undefined

                            expect(() => {
                                // @ts-expect-error undefined
                                const stopSignalInstruction = new StopSignalInstruction(testVal)

                                stopSignalInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage(`STOPSIGNAL`, testVal))
                        })

                        test(`don't create from invalid number argument`, () => {
                            const testVal = -1

                            expect(() => {
                                const stopSignalInstruction = new StopSignalInstruction(testVal)

                                stopSignalInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage(`STOPSIGNAL`, testVal))
                        })

                        test(`don't create from empty string argument`, () => {
                            const testVal = ''

                            expect(() => {
                                const stopSignalInstruction = new StopSignalInstruction(testVal)

                                stopSignalInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage(`STOPSIGNAL`, testVal))
                        })

                        test(`don't create from invalid numeric string argument`, () => {
                            const testVal = '-1'

                            expect(() => {
                                const stopSignalInstruction = new StopSignalInstruction(testVal)

                                stopSignalInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage(`STOPSIGNAL`, testVal))
                        })

                        test(`don't create from invalid string argument`, () => {
                            const testVal = 'invalid'

                            expect(() => {
                                const stopSignalInstruction = new StopSignalInstruction(testVal)

                                stopSignalInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage(`STOPSIGNAL`, testVal))
                        })
                    })
                })
            })
        })
    })
})

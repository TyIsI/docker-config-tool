import { generateConstructorErrorMessage, generateInvalidArgumentErrorMessage } from '../../../../../shared/utils'
import { VolumeInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`VOLUME`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        test(`create instruction with a simple value`, () => {
                            const volumeInstruction = new VolumeInstruction('/data/test')

                            expect(volumeInstruction.toString()).toBe(`VOLUME ["/data/test"]`)
                        })

                        test(`create a instruction with a multi-part string value`, () => {
                            const volumeInstruction = new VolumeInstruction('/volume/test1 /volume/test2')

                            expect(volumeInstruction.toString()).toBe(`VOLUME ["/volume/test1","/volume/test2"]`)
                        })

                        test(`create a instruction with a multi-part array value`, () => {
                            const volumeInstruction = new VolumeInstruction('/volume/test1', '/volume/test2')

                            expect(volumeInstruction.toString()).toBe(`VOLUME ["/volume/test1","/volume/test2"]`)
                        })

                        test(`don't create from empty arguments`, () => {
                            expect(() => {
                                const volumeInstruction = new VolumeInstruction()

                                volumeInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('VOLUME', []))
                        })

                        test(`don't create from empty string argument`, () => {
                            expect(() => {
                                const volumeInstruction = new VolumeInstruction('')

                                volumeInstruction.toString()

                                expect(false).toBeTruthy()
                            }).toThrow(generateConstructorErrorMessage('VOLUME', ['']))
                        })

                        test(`don't create from empty string array argument`, () => {
                            expect(() => {
                                // @ts-expect-error invalid input
                                const volumeInstruction = new VolumeInstruction([''])

                                volumeInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('VOLUME', [['']]))
                        })
                    })

                    describe(`methods`, () => {
                        describe(`add volume value`, () => {
                            test(`create instruction from string and add an extra output parameter`, () => {
                                const volumeInstruction = new VolumeInstruction('/data/test')

                                volumeInstruction.addVolume('/var/tmp')

                                expect(volumeInstruction.toString()).toBe(`VOLUME ["/data/test","/var/tmp"]`)
                            })

                            test(`create a instruction from multi-part value and add an extra output parameter`, () => {
                                const volumeInstruction = new VolumeInstruction('/data/test')

                                volumeInstruction.addVolume('/var/tmp')

                                expect(volumeInstruction.toString()).toBe(`VOLUME ["/data/test","/var/tmp"]`)
                            })

                            test(`don't add empty instruction parameter`, () => {
                                expect(() => {
                                    const volumeInstruction = new VolumeInstruction('/data/test')

                                    // @ts-expect-error empty params
                                    volumeInstruction.addVolume()

                                    volumeInstruction.toString()
                                }).toThrow(`Invalid volume argument: undefined undefined`)
                            })

                            test(`don't add empty string instruction parameter`, () => {
                                expect(() => {
                                    const volumeInstruction = new VolumeInstruction('/data/test')

                                    volumeInstruction.addVolume('')

                                    volumeInstruction.toString()
                                }).toThrow(`Invalid volume argument: string ""`)
                            })

                            test(`don't add invalid instruction parameter`, () => {
                                const testVal = -1

                                expect(() => {
                                    const volumeInstruction = new VolumeInstruction('/data/test')

                                    // @ts-expect-error undefined
                                    volumeInstruction.addVolume(testVal)

                                    volumeInstruction.toString()
                                }).toThrow(generateInvalidArgumentErrorMessage(`volume`, testVal))
                            })
                        })
                    })
                })
            })
        })
    })
})

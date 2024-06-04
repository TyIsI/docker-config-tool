import { generateInvalidArgumentErrorMessage } from '../../../../../shared/utils'
import { VolumeInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`VOLUME`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`addVolume`, () => {
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

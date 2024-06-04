import { generateInvalidArgumentErrorMessage } from '../../../../../shared/utils'
import { VolumeInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`VOLUME`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`set`, () => {
                                const volumeInstruction = new VolumeInstruction('/volume')

                                volumeInstruction.setOnBuild()

                                expect(volumeInstruction.toString()).toMatch('ONBUILD VOLUME ["/volume"]')
                            })

                            test(`set with value`, () => {
                                const volumeInstruction = new VolumeInstruction('/volume')

                                volumeInstruction.setOnBuild(true)

                                expect(volumeInstruction.toString()).toMatch('ONBUILD VOLUME ["/volume"]')
                            })

                            test(`set and unset`, () => {
                                const volumeInstruction = new VolumeInstruction('/volume')

                                volumeInstruction.setOnBuild(true)

                                volumeInstruction.setOnBuild(false)

                                expect(volumeInstruction.toString()).toMatch('VOLUME ["/volume"]')
                            })

                            test(`do not set with invalid value`, () => {
                                const val = 'no'

                                expect(() => {
                                    const volumeInstruction = new VolumeInstruction('/volume')

                                    // @ts-expect-error not assignable
                                    volumeInstruction.setOnBuild(val)
                                }).toThrow(generateInvalidArgumentErrorMessage('VOLUME', val))
                            })
                        })
                    })
                })
            })
        })
    })
})

import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { VolumeInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`VOLUME`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`common`, () => {
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
                    })
                })
            })
        })
    })
})

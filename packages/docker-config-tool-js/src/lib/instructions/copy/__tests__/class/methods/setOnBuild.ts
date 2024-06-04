import { CopyInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`COPY`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`create a instruction and set onbuild without arguments`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setOnBuild()

                                expect(copyInstruction.toString()).toBe('ONBUILD COPY . .')
                            })

                            test(`create a instruction and set onbuild to true`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setOnBuild(true)

                                expect(copyInstruction.toString()).toBe('ONBUILD COPY . .')
                            })

                            test(`create a instruction and set onbuild to true and then false`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setOnBuild(true)
                                copyInstruction.setOnBuild(false)

                                expect(copyInstruction.toString()).toBe('COPY . .')
                            })

                            test(`don't set onbuild with an invalid value`, () => {
                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    // @ts-expect-error invalid type
                                    copyInstruction.setOnBuild('no')

                                    copyInstruction.toString()
                                }).toThrow('Invalid COPY argument: string "no"')
                            })

                            test(`don't set onbuild with from set`, () => {
                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    copyInstruction.setFrom('stage')

                                    copyInstruction.setOnBuild()

                                    copyInstruction.toString()
                                }).toThrow('COPY does not support ONBUILD with from parameter')
                            })
                        })
                    })
                })
            })
        })
    })
})

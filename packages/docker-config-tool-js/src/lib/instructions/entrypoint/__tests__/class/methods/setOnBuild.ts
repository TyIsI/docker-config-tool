import { EntryPointInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ENTRYPOINT`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`create a instruction and set onbuild without arguments`, () => {
                                const entrypointInstruction = new EntryPointInstruction('/bin/true')

                                entrypointInstruction.setOnBuild()

                                expect(entrypointInstruction.toString()).toBe('ONBUILD ENTRYPOINT ["/bin/true"]')
                            })

                            test(`create a instruction and set onbuild to true`, () => {
                                const entrypointInstruction = new EntryPointInstruction('/bin/true')

                                entrypointInstruction.setOnBuild(true)

                                expect(entrypointInstruction.toString()).toBe('ONBUILD ENTRYPOINT ["/bin/true"]')
                            })

                            test(`create a instruction and set onbuild to true and then false`, () => {
                                const entrypointInstruction = new EntryPointInstruction('/bin/true')

                                entrypointInstruction.setOnBuild(true)
                                entrypointInstruction.setOnBuild(false)

                                expect(entrypointInstruction.toString()).toBe('ENTRYPOINT ["/bin/true"]')
                            })

                            test(`create a instruction and try to set onbuild with an invalid value`, () => {
                                expect(() => {
                                    const entrypointInstruction = new EntryPointInstruction('/bin/true')

                                    // @ts-expect-error invalid type
                                    entrypointInstruction.setOnBuild('no')

                                    entrypointInstruction.toString()
                                }).toThrow('Invalid ENTRYPOINT argument: string "no"')
                            })
                        })
                    })
                })
            })
        })
    })
})

import { AddInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ADD`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setKeepGitDir`, () => {
                            test(`create a instruction and set keep git dir without arguments`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setKeepGitDir()

                                expect(addInstruction.toString()).toBe('ADD --keepGitDir . .')
                            })

                            test(`create a instruction and set keep git dir to true`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setKeepGitDir(true)

                                expect(addInstruction.toString()).toBe('ADD --keepGitDir . .')
                            })

                            test(`create a instruction and set keep git dir to true and then false`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                addInstruction.setKeepGitDir(true)
                                addInstruction.setKeepGitDir(false)

                                expect(addInstruction.toString()).toBe('ADD . .')
                            })

                            test(`create a instruction and try to set keep git dir with an invalid value`, () => {
                                expect(() => {
                                    const addInstruction = new AddInstruction('.', '.')

                                    // @ts-expect-error invalid type
                                    addInstruction.setKeepGitDir('no')

                                    addInstruction.toString()
                                }).toThrow('Invalid input for setKeepGitDir: "no"')
                            })
                        })
                    })
                })
            })
        })
    })
})

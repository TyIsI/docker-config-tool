import { FromInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`FROM`, () => {
                describe(`methods`, () => {
                    describe(`setAs`, () => {
                        test(`set as with string`, () => {
                            const fromInstruction = new FromInstruction('scratch')

                            fromInstruction.setAs('workspace')

                            expect(fromInstruction.toString()).toBe('FROM scratch AS workspace')
                        })

                        test(`set as with string`, () => {
                            const fromInstruction = new FromInstruction('scratch')

                            fromInstruction.setAs('workspace')

                            expect(fromInstruction.toString()).toBe('FROM scratch AS workspace')
                        })

                        test(`don't set with missing argument`, () => {
                            expect(() => {
                                const fromInstruction = new FromInstruction('scratch')

                                // @ts-expect-error missing argument
                                fromInstruction.setAs()

                                fromInstruction.toString()
                            }).toThrow('Missing or invalid arguments for setAs: undefined undefined')
                        })

                        test(`don't set with empty string`, () => {
                            expect(() => {
                                const fromInstruction = new FromInstruction('scratch')

                                fromInstruction.setAs('')

                                fromInstruction.toString()
                            }).toThrow('Missing or invalid arguments for setAs: string ""')
                        })
                    })
                })
            })
        })
    })
})

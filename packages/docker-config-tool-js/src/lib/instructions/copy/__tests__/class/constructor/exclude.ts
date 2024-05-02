import { CopyInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`COPY`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`exclude`, () => {
                            test(`create a instruction and set exclude with a valid value '.git'`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.addExclude('.git')

                                copyInstruction.toString()

                                expect(copyInstruction.toString()).toBe('COPY --exclude=.git . .')
                            })

                            test(`create a instruction and set exclude with multiple valid values '.git node_modules'`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.addExclude('.git')
                                copyInstruction.addExclude('node_modules')

                                copyInstruction.toString()

                                expect(copyInstruction.toString()).toBe(
                                    'COPY --exclude=.git --exclude=node_modules . .'
                                )
                            })

                            test(`create a instruction and set exclude with an invalid numeric value '888'`, () => {
                                const testExcludeValue = 888

                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    // @ts-expect-error wrong type
                                    copyInstruction.addExclude(testExcludeValue)
                                }).toThrow(`Invalid input for addExclude: "${testExcludeValue}"`)
                            })
                        })
                    })
                })
            })
        })
    })
})

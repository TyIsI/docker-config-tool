import { ArgInstruction } from '../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ARG`, () => {
                describe(`class`, () => {
                    describe(`edge-cases`, () => {
                        test(`fail if argName was forced to empty`, () => {
                            expect(() => {
                                const argInstruction = new ArgInstruction('TEST=test')

                                argInstruction.argName = ''

                                argInstruction.toString()
                            }).toThrow()
                        })

                        test(`fail if argName was forced to null`, () => {
                            expect(() => {
                                const argInstruction = new ArgInstruction('TEST=test')

                                // @ts-expect-error null
                                argInstruction.argName = null

                                argInstruction.toString()
                            }).toThrow()
                        })
                    })
                })
            })
        })
    })
})

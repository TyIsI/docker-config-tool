import { validateAddInstructionParams } from '../validators'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ADD`, () => {
                describe(`validators`, () => {
                    describe(`validateAddInstructionParams`, () => {
                        test(`pass - default`, () => {
                            const [valid] = validateAddInstructionParams(['.', '.'])

                            expect(valid).toBeTruthy()
                        })

                        test(`fail - default`, () => {
                            // @ts-expect-error invalid
                            const [valid, error] = validateAddInstructionParams([undefined])

                            expect(valid).toBeFalsy()
                            expect(error).toBeTruthy()
                            expect(error).toMatchObject(['Invalid input'])
                        })
                    })
                })
            })
        })
    })
})

import { validateRunInstructionParams } from '../validators'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`validators`, () => {
                    test(`run validateRunInstructionParams with simple string value`, () => {
                        const testVal = 'echo test'

                        const [valid, result] = validateRunInstructionParams(testVal)

                        expect(valid).toBeTruthy()
                        expect(result).toMatch(testVal)
                    })

                    test(`run validateRunInstructionParams with simple string value`, () => {
                        // @ts-expect-error invalid
                        const [valid, result] = validateRunInstructionParams()

                        expect(valid).toBeFalsy()
                        expect(result).toMatchObject(['Invalid input'])
                    })
                })
            })
        })
    })
})

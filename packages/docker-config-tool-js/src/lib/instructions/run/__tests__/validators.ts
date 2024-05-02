import { validateRunInstructionParameters } from '../validators'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`validators`, () => {
                    test(`run validateRunInstructionParameters with simple string value`, () => {
                        const testVal = 'echo test'

                        const [valid, result] = validateRunInstructionParameters(testVal)

                        expect(valid).toBeTruthy()
                        expect(result).toMatch(testVal)
                    })

                    test(`run validateRunInstructionParameters with simple string value`, () => {
                        // @ts-expect-error invalid
                        const [valid, result] = validateRunInstructionParameters()

                        expect(valid).toBeFalsy()
                        expect(result).toMatchObject(['Invalid input'])
                    })
                })
            })
        })
    })
})

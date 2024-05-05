import { validateRunInstructionParams } from '../validators'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`validators`, () => {
                    test(`run validateRunInstructionParams with simple string value`, () => {
                        const testVal: [string] = ['echo test']

                        const [valid, result] = validateRunInstructionParams(testVal)

                        expect(valid).toBeTruthy()
                        expect(result).toMatchObject(testVal)
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

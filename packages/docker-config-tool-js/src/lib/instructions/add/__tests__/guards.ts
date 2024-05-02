import { isAddInstructionParams } from '../guards'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ADD`, () => {
                describe(`guards`, () => {
                    describe(`isAddInstructionParams`, () => {
                        test(`pass - default`, () => {
                            expect(isAddInstructionParams(['.', '.'])).toBeTruthy()
                        })

                        test(`fail - default`, () => {
                            expect(isAddInstructionParams([undefined])).toBeFalsy()
                        })
                    })
                })
            })
        })
    })
})

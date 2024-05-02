import { isCopyInstructionExcludes, isCopyInstructionParams } from '../guards'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`COPY`, () => {
                describe(`guards`, () => {
                    describe(`isCopyInstructionExcludes`, () => {
                        test(`pass - default`, () => {
                            expect(isCopyInstructionExcludes(['.exclude'])).toBeTruthy()
                        })

                        test(`fail - empty argument`, () => {
                            // @ts-expect-error empty argument
                            expect(isCopyInstructionExcludes()).toBeFalsy()
                        })

                        test(`fail - empty string argument`, () => {
                            expect(isCopyInstructionExcludes([''])).toBeFalsy()
                        })
                    })

                    describe(`isCopyInstructionParams`, () => {
                        test(`pass - default`, () => {
                            expect(isCopyInstructionParams(['.', '.'])).toBeTruthy()
                        })

                        test(`fail - empty argument`, () => {
                            // @ts-expect-error empty argument
                            expect(isCopyInstructionParams()).toBeFalsy()
                        })

                        test(`fail - empty string argument`, () => {
                            expect(isCopyInstructionParams([''])).toBeFalsy()
                        })
                    })
                })
            })
        })
    })
})

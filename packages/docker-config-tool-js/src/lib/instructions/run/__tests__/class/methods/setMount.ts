import { RunInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setMount`, () => {
                            test('pass', () => {
                                const runInstruction = new RunInstruction(['/bin/sh', '-c'])

                                expect(runInstruction.toString()).toMatch(`RUN /bin/sh -c`)
                            })
                        })
                    })
                })
            })
        })
    })
})

import { RunInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setSecurity`, () => {
                            test('pass - sandbox', () => {
                                const runInstruction = new RunInstruction(['/bin/sh', '-c'])

                                runInstruction.setSecurity('sandbox')

                                expect(runInstruction.toString()).toMatch(`RUN --security=sandbox /bin/sh -c`)
                            })

                            test('pass - insecure', () => {
                                const runInstruction = new RunInstruction(['/bin/sh', '-c'])

                                runInstruction.setSecurity('insecure')

                                expect(runInstruction.toString()).toMatch(`RUN --security=insecure /bin/sh -c`)
                            })
                        })
                    })
                })
            })
        })
    })
})

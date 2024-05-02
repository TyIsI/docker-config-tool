import { RunInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setNetwork`, () => {
                            test('pass - default', () => {
                                const runInstruction = new RunInstruction(['/bin/sh', '-c'])

                                runInstruction.setNetwork('default')

                                expect(runInstruction.toString()).toMatch(`RUN --network=default /bin/sh -c`)
                            })

                            test('pass - none', () => {
                                const runInstruction = new RunInstruction(['/bin/sh', '-c'])

                                runInstruction.setNetwork('none')

                                expect(runInstruction.toString()).toMatch(`RUN --network=none /bin/sh -c`)
                            })

                            test('pass - host', () => {
                                const runInstruction = new RunInstruction(['/bin/sh', '-c'])

                                runInstruction.setNetwork('host')

                                expect(runInstruction.toString()).toMatch(`RUN --network=host /bin/sh -c`)
                            })
                        })
                    })
                })
            })
        })
    })
})

import { Stage } from '../../../../../stage/class'
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

                                runInstruction.setMount({ type: 'cache', target: '/cache' })

                                expect(runInstruction.toString()).toMatch(
                                    `RUN --mount=type=cache,target=/cache /bin/sh -c`
                                )
                            })

                            test('pass', () => {
                                const stage = new Stage('scratch')

                                const runInstruction = new RunInstruction(['/bin/sh', '-c'])

                                runInstruction.setMount({ type: 'cache', target: '/cache', from: stage })

                                expect(runInstruction.toString()).toMatch(
                                    `RUN --mount=type=cache,target=/cache,from=${stage.id} /bin/sh -c`
                                )
                            })
                        })
                    })
                })
            })
        })
    })
})

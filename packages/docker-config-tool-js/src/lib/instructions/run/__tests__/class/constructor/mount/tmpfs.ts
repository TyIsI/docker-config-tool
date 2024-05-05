import { RunInstruction } from '../../../../class'
import { type RunInstructionParamsObject } from '../../../../types'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`mount`, () => {
                            describe(`tmpfs`, () => {
                                test(`create run instruction, with tmpfs mount options 'common'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'tmpfs',
                                            target: '/tmpfs',
                                            size: 1024
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=tmpfs,target=/tmpfs,size=1024 apt update'
                                    )
                                })

                                test(`don't create run instruction, with invalid tmpfs mount options`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        // @ts-expect-error invalid assignment
                                        mount: { type: 'tmpfs' }
                                    }

                                    expect(() => {
                                        const runInstruction = new RunInstruction(testVal)

                                        runInstruction.toString()
                                    }).toThrow()
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})

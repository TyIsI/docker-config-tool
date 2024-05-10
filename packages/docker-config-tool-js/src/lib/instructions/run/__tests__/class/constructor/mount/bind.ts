import { Stage } from '../../../../../../stage/class'
import { RunInstruction } from '../../../../class'
import { type RunInstructionParamsObject } from '../../../../types'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`mount`, () => {
                            describe(`bind`, () => {
                                test(`create run instruction, with bind mount options 'common'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'bind',
                                            target: '/cache'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=bind,target=/cache apt update'
                                    )
                                })

                                test(`create run instruction, with bind mount option 'from'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'bind',
                                            target: '/cache',
                                            from: 'workspace'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=bind,target=/cache,from=workspace apt update'
                                    )
                                })

                                test(`create run instruction, with bind mount option 'source'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'bind',
                                            target: '/cache',
                                            source: '/workspace'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=bind,target=/cache,source=/workspace apt update'
                                    )
                                })

                                test(`create run instruction, with bind mount options, with from and source`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'bind',
                                            target: '/cache',
                                            from: 'workspace',
                                            source: '/workspace'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=bind,target=/cache,from=workspace,source=/workspace apt update'
                                    )
                                })

                                test(`create run instruction, with bind mount option, with rw`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'bind',
                                            target: '/cache',
                                            from: 'workspace',
                                            source: '/workspace',
                                            rw: true
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=bind,target=/cache,from=workspace,source=/workspace,rw apt update'
                                    )
                                })

                                test(`create run instruction, with bind mount option 'rw'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'bind',
                                            target: '/cache',
                                            from: 'workspace',
                                            source: '/workspace',
                                            rw: false
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=bind,target=/cache,from=workspace,source=/workspace apt update'
                                    )
                                })

                                test(`create run instruction, with bind mount option 'readwrite'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'bind',
                                            target: '/cache',
                                            from: 'workspace',
                                            source: '/workspace',
                                            readwrite: true
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=bind,target=/cache,from=workspace,source=/workspace,rw apt update'
                                    )
                                })

                                test(`create run instruction, with bind mount option 'readwrite'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'bind',
                                            target: '/cache',
                                            from: 'workspace',
                                            source: '/workspace',
                                            readwrite: false
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=bind,target=/cache,from=workspace,source=/workspace apt update'
                                    )
                                })

                                test(`create run instruction, with bind mount options, with stage from`, () => {
                                    const workspaceStage = new Stage({ from: 'scratch', as: 'workspace' })

                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'bind',
                                            target: '/cache',
                                            from: workspaceStage,
                                            source: '/cache'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=bind,target=/cache,from=workspace,source=/cache apt update'
                                    )
                                })

                                test(`create run instruction, with bind mount options, with stacked stage from`, () => {
                                    const stage1 = new Stage({ from: 'scratch', as: 'stage1' })

                                    const stage2 = new Stage({ from: stage1, as: 'stage2' })

                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'bind',
                                            target: '/cache',
                                            from: stage2,
                                            source: '/cache'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=bind,target=/cache,from=stage2,source=/cache apt update'
                                    )
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})

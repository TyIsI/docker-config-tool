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
                            describe(`cache`, () => {
                                test(`create run instruction, with cache mount options 'common'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option 'id'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            id: 'test-cache'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,id=test-cache apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option 'from'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            from: 'workspace'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,from=workspace apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option 'source'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            source: '/workspace'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,source=/workspace apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option 'from and source'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            from: 'workspace',
                                            source: '/workspace'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,from=workspace,source=/workspace apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option 'ro'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            from: 'workspace',
                                            source: '/workspace',
                                            ro: true
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,from=workspace,source=/workspace,ro apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option 'ro'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            from: 'workspace',
                                            source: '/workspace',
                                            ro: false
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,from=workspace,source=/workspace apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option 'readonly'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            from: 'workspace',
                                            source: '/workspace',
                                            readonly: true
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,from=workspace,source=/workspace,ro apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option 'readonly'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            from: 'workspace',
                                            source: '/workspace',
                                            readonly: false
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,from=workspace,source=/workspace apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option: shared=sharing`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            from: 'workspace',
                                            source: '/workspace',
                                            sharing: 'shared'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,from=workspace,source=/workspace,sharing=shared apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option: private=sharing`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            from: 'workspace',
                                            source: '/workspace',
                                            sharing: 'private'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,from=workspace,source=/workspace,sharing=private apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option: locked=sharing`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            from: 'workspace',
                                            source: '/workspace',
                                            sharing: 'locked'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,from=workspace,source=/workspace,sharing=locked apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option 'numeric file access mode'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            mode: 755
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,mode=755 apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option 'string file access mode'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            mode: '755'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,mode=755 apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option 'uid'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            uid: 12345
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,uid=12345 apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option 'gid'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            gid: 12345
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,gid=12345 apt update'
                                    )
                                })

                                test(`create run instruction, with cache mount option 'uid and gid'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            uid: 12345,
                                            gid: 12345
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,uid=12345,gid=12345 apt update'
                                    )
                                })

                                test(`create run instruction, with bind mount options, with stage from`, () => {
                                    const workspaceStage = new Stage({ from: 'scratch', as: 'workspace' })

                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'cache',
                                            target: '/cache',
                                            from: workspaceStage,
                                            source: '/cache'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=cache,target=/cache,from=workspace,source=/cache apt update'
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

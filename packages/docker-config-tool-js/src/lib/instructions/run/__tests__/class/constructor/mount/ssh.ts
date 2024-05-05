import { RunInstruction } from '../../../../class'
import { type RunInstructionParamsObject } from '../../../../types'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`mount`, () => {
                            describe(`ssh`, () => {
                                test(`create run instruction, with ssh mount options 'minimal'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'ssh'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch('RUN --mount=type=ssh apt update')
                                })

                                test(`create run instruction, with ssh mount options 'id'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'ssh',
                                            id: 'test-ssh'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=ssh,id=test-ssh apt update'
                                    )
                                })

                                test(`create run instruction, with ssh mount options 'target'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'ssh',
                                            id: 'test-ssh',
                                            target: '/some/ssh/config/file'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=ssh,id=test-ssh,target=/some/ssh/config/file apt update'
                                    )
                                })

                                test(`create run instruction, with ssh mount options 'required set false'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'ssh',
                                            id: 'test-ssh',
                                            target: '/some/ssh/config/file',
                                            required: false
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=ssh,id=test-ssh,target=/some/ssh/config/file apt update'
                                    )
                                })

                                test(`create run instruction, with ssh mount options 'required set true'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'ssh',
                                            id: 'test-ssh',
                                            target: '/some/ssh/config/file',
                                            required: true
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=ssh,id=test-ssh,target=/some/ssh/config/file,required apt update'
                                    )
                                })

                                test(`create run instruction, with ssh mount options 'numeric file access mode'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'ssh',
                                            id: 'test-ssh',
                                            target: '/some/ssh/config/file',
                                            mode: 755
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=ssh,id=test-ssh,target=/some/ssh/config/file,mode=755 apt update'
                                    )
                                })

                                test(`create run instruction, with ssh mount options 'string file access mode'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'ssh',
                                            id: 'test-ssh',
                                            target: '/some/ssh/config/file',
                                            mode: '755'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=ssh,id=test-ssh,target=/some/ssh/config/file,mode=755 apt update'
                                    )
                                })

                                test(`create run instruction, with ssh mount options 'uid'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'ssh',
                                            id: 'test-ssh',
                                            target: '/some/ssh/config/file',
                                            uid: 12345
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=ssh,id=test-ssh,target=/some/ssh/config/file,uid=12345 apt update'
                                    )
                                })

                                test(`create run instruction, with ssh mount options 'gid'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'ssh',
                                            id: 'test-ssh',
                                            target: '/some/ssh/config/file',
                                            gid: 12345
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=ssh,id=test-ssh,target=/some/ssh/config/file,gid=12345 apt update'
                                    )
                                })

                                test(`create run instruction, with ssh mount options 'uid and gid'`, () => {
                                    const testVal: RunInstructionParamsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'ssh',
                                            id: 'test-ssh',
                                            target: '/some/ssh/config/file',
                                            uid: 12345,
                                            gid: 12345
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=ssh,id=test-ssh,target=/some/ssh/config/file,uid=12345,gid=12345 apt update'
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

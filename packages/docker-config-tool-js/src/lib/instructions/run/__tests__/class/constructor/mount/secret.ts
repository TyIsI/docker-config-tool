import { RunInstruction } from '../../../../class'
import { type RunInstructionArgsObject } from '../../../../types'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`mount`, () => {
                            describe(`secret`, () => {
                                test(`create run instruction, with secret mount options 'default'`, () => {
                                    const testVal: RunInstructionArgsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'secret',
                                            id: 'test-secret'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=secret,id=test-secret apt update'
                                    )
                                })

                                test(`create run instruction, with secret mount options 'target'`, () => {
                                    const testVal: RunInstructionArgsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'secret',
                                            id: 'test-secret',
                                            target: '/some/secret/config/file'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=secret,id=test-secret,target=/some/secret/config/file apt update'
                                    )
                                })

                                test(`create run instruction, with secret mount options 'required set false'`, () => {
                                    const testVal: RunInstructionArgsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'secret',
                                            id: 'test-secret',
                                            target: '/some/secret/config/file',
                                            required: false
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=secret,id=test-secret,target=/some/secret/config/file apt update'
                                    )
                                })

                                test(`create run instruction, with secret mount options 'required set true'`, () => {
                                    const testVal: RunInstructionArgsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'secret',
                                            id: 'test-secret',
                                            target: '/some/secret/config/file',
                                            required: true
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=secret,id=test-secret,target=/some/secret/config/file,required apt update'
                                    )
                                })

                                test(`create run instruction, with secret mount options 'numeric file access mode'`, () => {
                                    const testVal: RunInstructionArgsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'secret',
                                            id: 'test-secret',
                                            target: '/some/secret/config/file',
                                            mode: 755
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=secret,id=test-secret,target=/some/secret/config/file,mode=755 apt update'
                                    )
                                })

                                test(`create run instruction, with secret mount options 'string file access mode'`, () => {
                                    const testVal: RunInstructionArgsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'secret',
                                            id: 'test-secret',
                                            target: '/some/secret/config/file',
                                            mode: '755'
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=secret,id=test-secret,target=/some/secret/config/file,mode=755 apt update'
                                    )
                                })

                                test(`create run instruction, with secret mount options 'uid'`, () => {
                                    const testVal: RunInstructionArgsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'secret',
                                            id: 'test-secret',
                                            target: '/some/secret/config/file',
                                            uid: 12345
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=secret,id=test-secret,target=/some/secret/config/file,uid=12345 apt update'
                                    )
                                })

                                test(`create run instruction, with secret mount options 'gid'`, () => {
                                    const testVal: RunInstructionArgsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'secret',
                                            id: 'test-secret',
                                            target: '/some/secret/config/file',
                                            gid: 12345
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=secret,id=test-secret,target=/some/secret/config/file,gid=12345 apt update'
                                    )
                                })

                                test(`create run instruction, with secret mount options 'uid and gid'`, () => {
                                    const testVal: RunInstructionArgsObject = {
                                        commands: ['apt', 'update'],
                                        mount: {
                                            type: 'secret',
                                            id: 'test-secret',
                                            target: '/some/secret/config/file',
                                            uid: 12345,
                                            gid: 12345
                                        }
                                    }

                                    const runInstruction = new RunInstruction(testVal)

                                    expect(runInstruction.toString()).toMatch(
                                        'RUN --mount=type=secret,id=test-secret,target=/some/secret/config/file,uid=12345,gid=12345 apt update'
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

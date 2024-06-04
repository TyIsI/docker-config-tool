import { ShellInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`SHELL`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`common`, () => {
                            test(`verify class properties`, () => {
                                const shellInstruction = new ShellInstruction('echo test')

                                expect(shellInstruction.type).toMatch('instruction')
                                expect(shellInstruction.instruction).toMatch('SHELL')
                            })

                            test(`create instruction with a simple value`, () => {
                                const shellInstruction = new ShellInstruction('echo test')

                                expect(shellInstruction.toString()).toBe(`SHELL ["echo","test"]`)
                            })

                            test(`create a instruction with a multi-part value`, () => {
                                const shellInstruction = new ShellInstruction('echo', 'test')

                                expect(shellInstruction.toString()).toBe(`SHELL ["echo","test"]`)
                            })
                        })
                    })
                })
            })
        })
    })
})

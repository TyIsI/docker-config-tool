import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { FromInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`FROM`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`string`, () => {
                            test(`create instruction with a string`, () => {
                                const fromInstruction = new FromInstruction('scratch')

                                expect(fromInstruction.toString()).toBe('FROM scratch')
                            })

                            test(`create instruction with a string with a version tag`, () => {
                                const fromInstruction = new FromInstruction('alpine:3')

                                expect(fromInstruction.toString()).toBe('FROM alpine:3')
                            })

                            test(`create instruction with a string with a url`, () => {
                                const fromInstruction = new FromInstruction(
                                    'private-registry.example.com:443/project1/sub-project1/docker-image:x86_64-123beef'
                                )

                                expect(fromInstruction.toString()).toBe(
                                    'FROM private-registry.example.com:443/project1/sub-project1/docker-image:x86_64-123beef'
                                )
                            })

                            test(`create instruction with a string with a url with digest`, () => {
                                const fromInstruction = new FromInstruction(
                                    'private-registry.example.com:443/project1/sub-project1/docker-image:busybox-x86_64@sha256:061ca9704a714ee3e8b80523ec720c64f6209ad3f97c0ff7cb9ec7d19f15149f'
                                )

                                expect(fromInstruction.toString()).toBe(
                                    'FROM private-registry.example.com:443/project1/sub-project1/docker-image:busybox-x86_64@sha256:061ca9704a714ee3e8b80523ec720c64f6209ad3f97c0ff7cb9ec7d19f15149f'
                                )
                            })

                            test(`don't create with empty string`, () => {
                                expect(() => {
                                    const fromInstruction = new FromInstruction('')

                                    fromInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('FROM', ''))
                            })

                            test(`don't create with an off spec string`, () => {
                                expect(() => {
                                    const fromInstruction = new FromInstruction('1')

                                    fromInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('FROM', '1'))
                            })
                        })
                    })
                })
            })
        })
    })
})

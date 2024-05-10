import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { FromInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`FROM`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`object`, () => {
                            describe(`basic`, () => {
                                test(`create instruction from object`, () => {
                                    const fromInstruction = new FromInstruction({ from: 'scratch' })

                                    expect(fromInstruction.toString()).toBe('FROM scratch')
                                })

                                test(`create instruction from object with a version tag`, () => {
                                    const fromInstruction = new FromInstruction({ from: 'alpine:3' })

                                    expect(fromInstruction.toString()).toBe('FROM alpine:3')
                                })

                                test(`create instruction from object with a url`, () => {
                                    const fromInstruction = new FromInstruction({
                                        from: 'private-registry.example.com:443/project1/sub-project1/docker-image:x86_64-123beef'
                                    })

                                    expect(fromInstruction.toString()).toBe(
                                        'FROM private-registry.example.com:443/project1/sub-project1/docker-image:x86_64-123beef'
                                    )
                                })

                                test(`create instruction from object with a url and digest`, () => {
                                    const fromInstruction = new FromInstruction({
                                        from: 'private-registry.example.com:443/project1/sub-project1/docker-image@sha256:061ca9704a714ee3e8b80523ec720c64f6209ad3f97c0ff7cb9ec7d19f15149f'
                                    })

                                    expect(fromInstruction.toString()).toBe(
                                        'FROM private-registry.example.com:443/project1/sub-project1/docker-image@sha256:061ca9704a714ee3e8b80523ec720c64f6209ad3f97c0ff7cb9ec7d19f15149f'
                                    )
                                })

                                test(`don't create with empty object from parameter`, () => {
                                    expect(() => {
                                        const fromInstruction = new FromInstruction({ from: '' })

                                        fromInstruction.toString()
                                    }).toThrow(generateConstructorErrorMessage('FROM', { from: '' }))
                                })

                                test(`don't create with object with empty platform parameter`, () => {
                                    expect(() => {
                                        const fromInstruction = new FromInstruction({ from: 'scratch', platform: '' })

                                        fromInstruction.toString()
                                    }).toThrow(
                                        generateConstructorErrorMessage('FROM', { from: 'scratch', platform: '' })
                                    )
                                })

                                test(`don't create with object with empty as parameter`, () => {
                                    expect(() => {
                                        const fromInstruction = new FromInstruction({ from: 'scratch', as: '' })

                                        fromInstruction.toString()
                                    }).toThrow(generateConstructorErrorMessage('FROM', { from: 'scratch', as: '' }))
                                })
                            })

                            describe(`object with platform`, () => {
                                test(`create instruction from object with platform`, () => {
                                    const fromInstruction = new FromInstruction({ from: 'scratch', platform: 'x86_64' })

                                    expect(fromInstruction.toString()).toBe('FROM --platform=x86_64 scratch')
                                })

                                test(`create instruction from object with a version tag`, () => {
                                    const fromInstruction = new FromInstruction({
                                        from: 'alpine:3',
                                        platform: 'x86_64'
                                    })

                                    expect(fromInstruction.toString()).toBe('FROM --platform=x86_64 alpine:3')
                                })

                                test(`create instruction from object with a url`, () => {
                                    const fromInstruction = new FromInstruction({
                                        from: 'private-registry.example.com:443/project1/sub-project1/docker-image:x86_64-123beef',
                                        platform: 'x86_64'
                                    })

                                    expect(fromInstruction.toString()).toBe(
                                        'FROM --platform=x86_64 private-registry.example.com:443/project1/sub-project1/docker-image:x86_64-123beef'
                                    )
                                })

                                test(`create instruction from object with a url with digest`, () => {
                                    const fromInstruction = new FromInstruction({
                                        from: 'private-registry.example.com:443/project1/sub-project1/docker-image@sha256:061ca9704a714ee3e8b80523ec720c64f6209ad3f97c0ff7cb9ec7d19f15149f',
                                        platform: 'x86_64'
                                    })

                                    expect(fromInstruction.toString()).toBe(
                                        'FROM --platform=x86_64 private-registry.example.com:443/project1/sub-project1/docker-image@sha256:061ca9704a714ee3e8b80523ec720c64f6209ad3f97c0ff7cb9ec7d19f15149f'
                                    )
                                })
                            })

                            describe(`object with as`, () => {
                                test(`create instruction from object with as`, () => {
                                    const fromInstruction = new FromInstruction({ from: 'scratch', as: 'base' })

                                    expect(fromInstruction.toString()).toBe('FROM scratch AS base')
                                })

                                test(`create instruction from object with a version tag and as`, () => {
                                    const fromInstruction = new FromInstruction({ from: 'alpine:3', as: 'base' })

                                    expect(fromInstruction.toString()).toBe('FROM alpine:3 AS base')
                                })

                                test(`create instruction from object with a url and as`, () => {
                                    const fromInstruction = new FromInstruction({
                                        from: 'private-registry.example.com:443/project1/sub-project1/docker-image:x86_64-123beef',
                                        as: 'base'
                                    })

                                    expect(fromInstruction.toString()).toBe(
                                        'FROM private-registry.example.com:443/project1/sub-project1/docker-image:x86_64-123beef AS base'
                                    )
                                })

                                test(`create instruction from object with a url with digest and as`, () => {
                                    const fromInstruction = new FromInstruction({
                                        from: 'private-registry.example.com:443/project1/sub-project1/docker-image@sha256:061ca9704a714ee3e8b80523ec720c64f6209ad3f97c0ff7cb9ec7d19f15149f',
                                        as: 'base'
                                    })

                                    expect(fromInstruction.toString()).toBe(
                                        'FROM private-registry.example.com:443/project1/sub-project1/docker-image@sha256:061ca9704a714ee3e8b80523ec720c64f6209ad3f97c0ff7cb9ec7d19f15149f AS base'
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

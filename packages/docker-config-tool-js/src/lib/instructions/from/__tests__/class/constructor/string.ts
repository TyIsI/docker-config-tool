import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { FromInstruction } from '../../../class'

const testVariants = {
    // eslint-disable-next-line no-template-curly-in-string
    server: ['', 'private-registry.example.com', 'private-registry.example.com:443', '${REGISTRY_SERVER}'],
    // eslint-disable-next-line no-template-curly-in-string
    paths: ['', 'project', 'project1/sub-project1', '${IMAGE_PATH}'],
    // eslint-disable-next-line no-template-curly-in-string
    images: ['docker-image', '${IMAGE_NAME}'],
    // eslint-disable-next-line no-template-curly-in-string
    tags: ['', 'busybox-x86_64', '${IMAGE_TAG}'],
    // eslint-disable-next-line no-template-curly-in-string
    hashes: ['', 'sha256:061ca9704a714ee3e8b80523ec720c64f6209ad3f97c0ff7cb9ec7d19f15149f', '${IMAGE_HASH}']
}

const testCases = ['scratch', 'alpine:3']

testVariants.hashes.forEach((hash) => {
    testVariants.tags.forEach((tag) => {
        testVariants.images.forEach((image) => {
            testVariants.paths.forEach((path) => {
                testVariants.server.forEach((server) => {
                    const data = []

                    if (server !== '') data.push(server, '/')
                    if (path !== '') data.push(path, '/')

                    data.push(image)

                    if (tag !== '') data.push(':', tag)
                    if (hash !== '') data.push('@', hash)

                    testCases.push(data.join(''))
                })
            })
        })
    })
})

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`FROM`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`string`, () => {
                            test(`create instruction from strings`, () => {
                                testCases.forEach((testCase) => {
                                    const fromInstruction = new FromInstruction(testCase)

                                    expect(fromInstruction.toString()).toBe(`FROM ${testCase}`)
                                })
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

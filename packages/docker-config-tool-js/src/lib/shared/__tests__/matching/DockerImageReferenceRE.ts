import { DockerImageReferenceRE } from '../../matching'

const testVariants = {
    // eslint-disable-next-line no-template-curly-in-string
    server: ['', 'private-registry.example.com', 'private-registry.example.com:443', '${REGISTRY_SERVER}'],
    // eslint-disable-next-line no-template-curly-in-string
    paths: ['', 'project', 'project1/sub-project1', '${IMAGE_PATH}'],
    // eslint-disable-next-line no-template-curly-in-string
    images: ['docker-image', '${IMAGE_NAME}'],
    // eslint-disable-next-line no-template-curly-in-string
    tags: ['', 'busybox-x86_64', '1.25-alpine', '${IMAGE_TAG}'],
    // eslint-disable-next-line no-template-curly-in-string
    hashes: ['', 'sha256:061ca9704a714ee3e8b80523ec720c64f6209ad3f97c0ff7cb9ec7d19f15149f', '${IMAGE_HASH}']
}

const testCases = ['scratch', 'alpine:3']

testVariants.tags.forEach((tag) => {
    testVariants.images.forEach((image) => {
        testVariants.paths.forEach((path) => {
            testVariants.server.forEach((server) => {
                const data = []

                if (server !== '') data.push(server, '/')
                if (path !== '') data.push(path, '/')

                data.push(image)

                if (tag !== '') data.push(':', tag)

                testCases.push(data.join(''))
            })
        })
    })
})

testVariants.hashes.forEach((hash) => {
    testVariants.images.forEach((image) => {
        testVariants.paths.forEach((path) => {
            testVariants.server.forEach((server) => {
                const data = []

                if (server !== '') data.push(server, '/')
                if (path !== '') data.push(path, '/')

                data.push(image)

                if (hash !== '') data.push('@', hash)

                testCases.push(data.join(''))
            })
        })
    })
})

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`matching`, () => {
                describe(`DockerImageReferenceRE`, () => {
                    test(`pass - all`, () => {
                        testCases.forEach((testCase) => {
                            expect(DockerImageReferenceRE.test(testCase)).toBeTruthy()
                        })
                    })
                })
            })
        })
    })
})

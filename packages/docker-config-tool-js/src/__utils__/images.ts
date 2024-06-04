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

const baseTestCases = ['scratch', 'alpine:3']

const addVariantSet = (
    testCases: string[],
    serverNames: string[],
    pathNames: string[],
    imageNames: string[],
    subNames: string[],
    separator: string
): void => {
    subNames.forEach((sub) => {
        imageNames.forEach((image) => {
            pathNames.forEach((path) => {
                serverNames.forEach((server) => {
                    const data = []

                    if (server !== '') data.push(server, '/')
                    if (path !== '') data.push(path, '/')

                    data.push(image)

                    if (sub !== '') data.push(separator, sub)

                    testCases.push(data.join(''))
                })
            })
        })
    })
}

export const generateTestImages = (): string[] => {
    const testCases = baseTestCases

    const { server, paths, images, tags, hashes } = testVariants

    addVariantSet(testCases, server, paths, images, tags, ':')
    addVariantSet(testCases, server, paths, images, hashes, '@')

    return testCases
}

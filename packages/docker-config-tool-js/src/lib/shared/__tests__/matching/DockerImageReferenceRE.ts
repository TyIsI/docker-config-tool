import { generateTestImages } from '../../../../__utils__/images'
import { DockerImageReferenceRE } from '../../matching'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`matching`, () => {
                describe(`DockerImageReferenceRE`, () => {
                    test(`pass - all`, () => {
                        const testCases = generateTestImages()

                        testCases.forEach((testCase) => {
                            expect(DockerImageReferenceRE.test(testCase)).toBeTruthy()
                        })
                    })
                })
            })
        })
    })
})

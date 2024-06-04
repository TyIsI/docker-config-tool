import { generateTestImages } from '../../../../__utils__/images'
import { isDockerImageReference } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isDockerImageReference`, () => {
                    test(`pass - all`, () => {
                        const testCases = generateTestImages()

                        testCases.forEach((testCase) => {
                            expect(isDockerImageReference(testCase)).toBeTruthy()
                        })
                    })
                })
            })
        })
    })
})

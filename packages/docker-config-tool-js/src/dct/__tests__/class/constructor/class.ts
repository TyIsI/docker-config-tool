import { DockerConfigTool } from '../../../class'

describe(`DCT`, () => {
    describe(`class`, () => {
        describe(`constructor`, () => {
            describe(`basic`, () => {
                test(`create an instance`, () => {
                    const dct = new DockerConfigTool()

                    expect(dct).toBeTruthy()
                })
            })
        })
    })
})

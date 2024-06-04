import { DockerConfigTool } from '../../../class'

describe(`DCT`, () => {
    describe(`class`, () => {
        describe(`constructor`, () => {
            describe(`common`, () => {
                test(`create an instance`, () => {
                    const dct = new DockerConfigTool()

                    expect(dct).toBeTruthy()
                })
            })
        })
    })
})

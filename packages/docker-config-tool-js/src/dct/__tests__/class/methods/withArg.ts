import { DockerConfigTool } from '../../../class'

describe(`DCT`, () => {
    describe(`class`, () => {
        describe(`methods`, () => {
            describe(`withArg`, () => {
                test(`create and add an ARG`, () => {
                    const dct = new DockerConfigTool()

                    dct.withArg('TESTARG')

                    const stage = dct.withStage('scratch')

                    expect(dct.toString()).toMatch(`ARG TESTARG\n\nFROM scratch AS ${stage.id}`)
                })
            })
        })
    })
})

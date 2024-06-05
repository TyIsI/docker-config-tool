import { DockerConfigTool } from '../../../class'

describe(`DCT`, () => {
    describe(`class`, () => {
        describe(`methods`, () => {
            describe(`withComment`, () => {
                test(`create and add a comment`, () => {
                    const dct = new DockerConfigTool()

                    dct.withComment('TESTARG')

                    const stage = dct.withStage('scratch')

                    expect(dct.toString()).toMatch(`# TESTARG\n\nFROM scratch AS ${stage.id}`)
                })
            })
        })
    })
})

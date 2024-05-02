import { DockerConfigTool } from '../../../class'

describe(`DCT`, () => {
    describe(`class`, () => {
        describe(`methods`, () => {
            describe(`toString`, () => {
                test(`print it`, () => {
                    const dct = new DockerConfigTool()

                    const stage = dct.createStage('scratch')

                    expect(dct.toString().trim()).toBe(`FROM scratch AS ${stage.id}`)
                })

                test(`don't print it if the stack is empty`, () => {
                    expect(() => {
                        const dct = new DockerConfigTool()

                        dct.toString()
                    }).toThrow('Empty stack. Nothing to print.')
                })
            })
        })
    })
})

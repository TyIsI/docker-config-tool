import { generateInvalidArgumentErrorMessage } from '../../../../../shared/utils'
import { WorkDirInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`WORKDIR`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`set`, () => {
                                const workdirInstruction = new WorkDirInstruction('/workdir')

                                workdirInstruction.setOnBuild()

                                expect(workdirInstruction.toString()).toMatch('ONBUILD WORKDIR /workdir')
                            })

                            test(`set with value`, () => {
                                const workdirInstruction = new WorkDirInstruction('/workdir')

                                workdirInstruction.setOnBuild(true)

                                expect(workdirInstruction.toString()).toMatch('ONBUILD WORKDIR /workdir')
                            })

                            test(`set and unset`, () => {
                                const workdirInstruction = new WorkDirInstruction('/workdir')

                                workdirInstruction.setOnBuild(true)

                                workdirInstruction.setOnBuild(false)

                                expect(workdirInstruction.toString()).toMatch('WORKDIR /workdir')
                            })

                            test(`do not set with invalid value`, () => {
                                const val = 'no'

                                expect(() => {
                                    const workdirInstruction = new WorkDirInstruction('/workdir')

                                    // @ts-expect-error not assignable
                                    workdirInstruction.setOnBuild(val)
                                }).toThrow(generateInvalidArgumentErrorMessage('WORKDIR', val))
                            })
                        })
                    })
                })
            })
        })
    })
})

import { DirectiveInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('common classes', () => {
            describe('instructions', () => {
                describe(`directives`, () => {
                    describe(`class`, () => {
                        describe(`constructor`, () => {
                            describe(`common`, () => {
                                test(`create a syntax directive`, () => {
                                    const directiveInstruction = new DirectiveInstruction(
                                        'syntax',
                                        'docker/dockerfile:1'
                                    )

                                    expect(directiveInstruction.toString()).toBe('# syntax=docker/dockerfile:1')
                                })

                                test(`create an escape directive`, () => {
                                    const directiveInstruction = new DirectiveInstruction('escape', '`')

                                    expect(directiveInstruction.toString()).toBe('# escape=`')
                                })

                                test(`don't create with an invalid directive type`, () => {
                                    expect(() => {
                                        const directiveInstruction = new DirectiveInstruction('invalid', 'invalid')

                                        directiveInstruction.toString()
                                    }).toThrow()
                                })

                                test(`don't create with an invalid syntax directive value`, () => {
                                    expect(() => {
                                        const directiveInstruction = new DirectiveInstruction('syntax', '.....')

                                        directiveInstruction.toString()
                                    }).toThrow()
                                })

                                test(`don't create with an invalid escape directive value`, () => {
                                    expect(() => {
                                        // @ts-expect-error null
                                        const directiveInstruction = new DirectiveInstruction('escape', false)

                                        directiveInstruction.toString()
                                    }).toThrow()
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})

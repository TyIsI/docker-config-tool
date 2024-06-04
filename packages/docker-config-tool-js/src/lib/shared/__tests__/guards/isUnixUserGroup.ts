import {
    isUnixUserGroupId,
    isUnixUserGroupIdComboString,
    isUnixUserGroupNumericId,
    isUnixUserGroupStringId
} from '../../guards'

const validUid = 54321
const validComboString = `${validUid}:${validUid}`

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isUnixUserGroup`, () => {
                    test(`pass - simple - numeric`, () => {
                        expect(isUnixUserGroupId(validUid)).toBeTruthy()
                    })

                    test(`pass - simple - string`, () => {
                        expect(isUnixUserGroupId(validUid.toString())).toBeTruthy()
                    })

                    test(`pass - combo string`, () => {
                        expect(isUnixUserGroupIdComboString(validComboString)).toBeTruthy()
                    })

                    test(`pass - complex - numeric`, () => {
                        expect(isUnixUserGroupNumericId(validUid)).toBeTruthy()
                    })

                    test(`pass - complex - string`, () => {
                        expect(isUnixUserGroupStringId(validUid.toString())).toBeTruthy()
                    })
                })
            })
        })
    })
})

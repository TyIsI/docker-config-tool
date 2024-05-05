import { z } from 'zod'
import {
    zRequiredString,
    zUIDGIDObj,
    zUIDGIDTuple,
    zUnixUserGroupId,
    zUnixUserGroupIdComboString,
    zUnixUserGroupNumericId
} from '../../shared/schema'

export const zUserInstructionPrimaryParam = z.union([
    zUnixUserGroupIdComboString,
    zUIDGIDTuple,
    z.array(zUnixUserGroupNumericId).nonempty().max(2),
    zUnixUserGroupNumericId
])

export const zUserInstructionParams = z.union(
    [
        z.tuple([zUIDGIDObj], { invalid_type_error: 'Invalid UIDGIDObj' }),
        z.tuple([zUnixUserGroupIdComboString], { invalid_type_error: 'Invalid UnixUserGroupIdComboString' }),
        z.tuple([zUIDGIDTuple], { invalid_type_error: 'Invalid UIDGIDTuple' }),
        z.tuple(
            [
                z
                    .array(zUnixUserGroupId, {
                        invalid_type_error: 'Invalid UnixUserGroupId array elements'
                    })
                    .nonempty()
                    .max(2)
            ],
            {
                invalid_type_error: 'Invalid UnixUserGroupId array'
            }
        ),
        z.tuple([zUnixUserGroupId, zUnixUserGroupId], {
            invalid_type_error: 'Invalid UnixUserGroupId,UnixUserGroupId tuple'
        }),
        z.tuple([zUnixUserGroupId], { invalid_type_error: 'Invalid UnixUserGroupId tuple' }),
        z.tuple([zRequiredString(), zRequiredString()], {
            invalid_type_error: 'Invalid RequiredString,RequiredString tuple'
        }),
        z.tuple([zRequiredString()], { invalid_type_error: 'Invalid RequiredString tuple' })
    ],
    { invalid_type_error: 'Invalid UserInstructionParams' }
)

import { type UnixUserGroupId } from '../../shared/types'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { isUserInstructionParamObject, isUserInstructionParamTuple } from './guards'
import { type IUserInstruction, type UserInstructionParameters } from './types'
import { validateUserInstructionParameters } from './validators'

export class UserInstruction implements IUserInstruction {
    type = 'instruction' as const

    uid?: UnixUserGroupId
    gid?: UnixUserGroupId

    constructor(...userInstructionParams: UserInstructionParameters) {
        const [valid, result] = validateUserInstructionParameters(userInstructionParams)

        if (!valid) throw new Error(generateConstructorErrorMessage('USER', userInstructionParams, result))

        if (isUserInstructionParamObject(userInstructionParams[0])) {
            this.uid = userInstructionParams[0].uid

            if (userInstructionParams[0].gid != null) this.gid = userInstructionParams[0].gid
        } else if (typeof userInstructionParams[0] === 'number') {
            this.uid = userInstructionParams[0]

            if (userInstructionParams.length === 2 && userInstructionParams[1] != null)
                this.gid = userInstructionParams[1]
        } else if (typeof userInstructionParams[0] === 'string') {
            if (userInstructionParams[0].includes(':')) {
                if (userInstructionParams[0].split(':').filter((e) => e != null && e !== '').length !== 2)
                    throw new Error(generateConstructorErrorMessage('USER', userInstructionParams, result))

                this.uid = Number(userInstructionParams[0].split(':')[0])
                this.gid = Number(userInstructionParams[0].split(':')[1])
            } else {
                this.uid = Number(userInstructionParams[0])
                if (userInstructionParams.length === 2 && userInstructionParams[1] != null)
                    this.gid = userInstructionParams[1]
            }
        } else if (isUserInstructionParamTuple(userInstructionParams[0])) {
            this.uid = userInstructionParams[0][0]

            if (userInstructionParams[0][1] != null) this.gid = userInstructionParams[0][1]
        }
    }

    toString(): string {
        return ['USER', [this.uid, this.gid].join(':')].join(' ')
    }
}

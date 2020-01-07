import * as types from '../constants/ActionType';

export const signUp = (user) => {
    return {
        type: types.SIGN_UP,
        user
    }
}
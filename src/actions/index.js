import * as types from '../constants/ActionType';

export const signUp = (user) => {
    return {
        type: types.SIGN_UP,
        user
    }
}

export const logIn = (user) => {
    return {
        type: types.LOG_IN,
        user
    }
}

export const deleteUser = (id) => {
    return {
        type: types.DELETE_USER,
        id
    }
}

export const showEditForm = (isEdit, id) => {
    return {
        type: types.SHOW_EDIT,
        isEdit,
        id
    }
}

export const editUser = (user) => {
    return {
        type: types.EDIT_USER,
        user
    }
}

export const getLanguages = () => {
    return {
        type: types.GET_LANGUAGES,
    }
}
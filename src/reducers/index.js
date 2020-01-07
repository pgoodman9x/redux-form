import * as types from '../constants/ActionType';

const initialState = {
    users: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case types.SIGN_UP:
            return {
                users: [...state.users,action.user] 
            }
        default: 
            return state;
    }
}

export default reducer;
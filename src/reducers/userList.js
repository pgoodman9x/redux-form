import * as types from '../constants/ActionType';
let data = JSON.parse(sessionStorage.getItem('userList'));
const initialState = data ? data : []

const myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SIGN_UP:
            return  [...state,action.user] 
        case types.LOG_IN:
            console.log(action);
            return state.map(u => {
                    if(u.id === action.user.id){
                        u.isLogin = !u.isLogin
                    }
                    return u;
                })
        case types.DELETE_USER:
           return state.filter(user => user.id !== action.id)
        case types.EDIT_USER:
            return state.map(u => {
                if(u.id === action.user.id){
                    u = action.user;
                }
                return u;
            })
        default: 
            return state;
    }
}

export default myReducer;
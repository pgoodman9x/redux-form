import * as types from '../constants/ActionType';
const initialState = {
    isEdit: false,
    id: null
}

const myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SHOW_EDIT:
            return {
                isEdit: action.isEdit,
                id: action.id
            }
        default: 
            return state;
    }
}

export default myReducer;
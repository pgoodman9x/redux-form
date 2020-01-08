
import { combineReducers } from 'redux'
import userList from './userList'
import showEditForm from './showEditForm'
import languageList from './languageList'

const myReducer = combineReducers({
    users: userList,
    showEditForm,
    languageList
})

export default myReducer;
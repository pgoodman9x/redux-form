import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logIn } from '../actions/index'

function ControlPanel() {
    const tempUser = JSON.parse(sessionStorage.getItem('tempUser'));
    const userList = useSelector(state => state.users);
    const dispatch = useDispatch();

    const handleLogout = () => {
        let foundedUser = userList.find(u => u.id === tempUser.id);
        if(foundedUser !== undefined){
            dispatch(logIn(foundedUser));
            sessionStorage.setItem('tempUser', JSON.stringify(foundedUser));
        }
    }
    return (
        <div className="py-4">
            {
                tempUser!==undefined ? `Welcome back, ${tempUser.email}` : undefined
            }
            <div className="mt-3">
                <Button onClick={handleLogout} variant="primary">Logout</Button>
            </div>
        </div>
    )
}

export default ControlPanel

import React, { useState, useEffect } from 'react'
import { Table, Button, ButtonToolbar, Form, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, showEditForm, editUser } from '../actions/index'
import { getLanguages } from '../actions'


function UserList() {
    const userList = useSelector(state => state.users);
    const tempUser = JSON.parse(sessionStorage.getItem('tempUser'));
    const editFormState = useSelector(state => state.showEditForm);
    const dispatch = useDispatch();

    const EditForm = () => {
        useEffect(() => {
            dispatch(getLanguages());
        }, [])
        const languageList = useSelector(state => state.languageList);
        const oldUser = userList.find(u => u.id === editFormState.id);

        const temp = {
            email: oldUser.email,
            password: oldUser.password,
            language: oldUser.language,
            gender: oldUser.gender,
            receiveemail: oldUser.receiveemail,
            isLogin: oldUser.isLogin
        }
        const [tempUser, setTempUser] = useState(temp);

        const handleFormChange = (event) => {
            let target = event.target;
            let value = target.type === 'checkbox' ? target.checked : target.value;
            let name = target.name;
            setTempUser({ id: oldUser.id, ...tempUser, [name]: value });
        }

        const handleFormSubmit = (event) => {
            event.preventDefault();
            dispatch(showEditForm(false));
            dispatch(editUser(tempUser));
        }

        return (
            <div>
                <Form onSubmit={handleFormSubmit}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Language</th>
                                <th>Gender</th>
                                <th>Receive Email</th>
                            </tr>
                        </thead>

                        <tbody>
                            <td>{oldUser.id}</td>
                            <td>{oldUser.email}</td>
                            <td>

                                <FormGroup controlId="formGroupPassword">
                                    <FormLabel>Password:</FormLabel>
                                    <FormControl type="password" name="password" value={tempUser.password}
                                        placeholder="Password" onChange={handleFormChange} />
                                </FormGroup>

                            </td>
                            <td>
                                <FormGroup controlId="formGroupLanguage">
                                    <FormLabel>Choose your language:</FormLabel>
                                    <div >
                                        {
                                            languageList.map((language, index) => {
                                                return (<FormCheck key={index} custom
                                                    type="radio" name="language" id={`language-` + index}
                                                    onChange={handleFormChange} checked={tempUser.language === language}
                                                    label={language} value={language} />)
                                            })
                                        }
                                    </div>
                                </FormGroup>
                            </td>
                            <td>
                                <FormGroup controlId="formGroupGender">
                                    <FormLabel>Choose your gender:</FormLabel>
                                    <FormControl as="select" value={tempUser.gender} name="gender" onChange={handleFormChange}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </FormControl>
                                </FormGroup>
                            </td>
                            <td>
                                <FormGroup controlId="formGroupReceiveEmail">
                                    <FormLabel>Receive email?</FormLabel>
                                    <FormCheck custom type="checkbox" name="receiveemail"
                                        id="receive-email" checked={tempUser.receiveemail ? true : false}
                                        label={tempUser.receiveemail ? "Yes" : "No"} onChange={handleFormChange}
                                        value={tempUser.receiveemail} />
                                </FormGroup>
                            </td>
                        </tbody>
                    </Table>
                    <FormGroup>
                        <div className="text-right">
                            <Button variant="primary" type="submit">Save</Button>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        )
    }

    const handleDeleteUser = (userId) => {
        if(userId === tempUser.id) {
            alert('You can\'t delete yourself!');
        }else{
            dispatch(deleteUser(userId));
        }
    }

    let Row = [];
    userList.forEach(user => {
        Row.push(
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.language}</td>
                <td>{user.gender}</td>
                <td>{user.receiveemail ? "Yes" : "No"}</td>
                <td>
                    <ButtonToolbar>
                        <Button onClick={() => dispatch(showEditForm(!editFormState.isEdit, user.id))} variant="outline-primary" className="mr-2">Edit</Button>
                        <Button onClick={() => handleDeleteUser(user.id)} variant="outline-danger">Delete</Button>
                    </ButtonToolbar>
                </td>
            </tr>
        )
    })

    return (
        <div className="py-4">
            {
                editFormState.isEdit ? <EditForm /> : undefined
            }
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Language</th>
                        <th>Gender</th>
                        <th>Receive Email</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Row
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default UserList

import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logIn } from '../actions'

function Login() {
    const userList = useSelector(state => state.users);
    const dispatch = useDispatch();

    const initialLoginInformation = { email: '', password: '' }
    const [user, setUser] = useState(initialLoginInformation);
    const [loginState, setLoginState] = useState({ isLogin: false, isSubmit: false });

    const handleLoginChange = (event) => {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        setUser({ ...user, [name]: value });
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        let foundedUser = userList.find(u => u.email === user.email && u.password === user.password);
        if (foundedUser !== undefined) {
            setLoginState({ isLogin: true, isSubmit: true })
            dispatch(logIn(foundedUser))
            sessionStorage.setItem('tempUser', JSON.stringify(foundedUser));
            setUser(initialLoginInformation);
        } else {
            setLoginState({ isLogin: false, isSubmit: true })
        }
    }
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div className="c-form">
                            <h1 className="c-form-title">SIGN IN</h1>
                            {loginState.isLogin && loginState.isSubmit ? <Alert variant="success">Login successfully!</Alert> : undefined}
                            {!loginState.isLogin && loginState.isSubmit ? <Alert variant="danger">Your login information is incorrect!</Alert> : undefined}
                            <Form onSubmit={handleSubmitLogin}>
                                <FormGroup controlId="formHorizontalEmail">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl type="email" placeholder="Email" name="email" onChange={handleLoginChange} value={user.email} />
                                </FormGroup>
                                
                                <FormGroup controlId="formHorizontalPassword">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl type="password" placeholder="Password" name="password" onChange={handleLoginChange} value={user.password} />
                                </FormGroup>

                                <FormGroup>
                                    <div className="text-right">
                                        <Button type="submit">Sign in</Button>
                                    </div>
                                </FormGroup>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login

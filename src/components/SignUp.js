import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button, FormCheck, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { signUp, getLanguages } from '../actions'

function SignUp() {
    const initialFormInfomation = { email: '', password: '', repassword: '', language: undefined, gender: 'Male', receiveemail: false, isLogin: false }
    const [user, setUser] = useState(initialFormInfomation);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const userList = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLanguages());
    }, [])

    const languageList = useSelector(state => state.languageList);

    const handleFormChange = (event) => {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        setUser(
            {
                id: userList !== undefined && userList.length - 1 >= 0 ? userList[userList.length - 1].id + 1 : 1,
                ...user,
                [name]: value 
            }
        );
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (isValid) {
            //remove repassword key from obj
            delete user['repassword'];
            dispatch(signUp(user));
        }
    }


    const validate = () => {
        const { email, password, repassword, language } = user;
        if (!email.includes('@') || userList.some(user => user.email === email)) {
            setError('Your email is not valid or existing');
            return false;
        } else if (password !== repassword) {
            setError('Your password is not entered or matched');
            return false;
        } else if (language === undefined) {
            setError('Please set your language!');
            return false;
        }
        setError('');
        setSuccess(true);
        return true;
    }

    useEffect(() => {
        let timer;
        setUser(initialFormInfomation);
        if (success) {
            timer = setTimeout(() => {
                setSuccess(false);
            }, 3000)
        }
        return () => {
            clearTimeout(timer);
        }
    }, [success])

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div className="c-form">
                            <h1 className="c-form-title">SIGN UP</h1>
                            {error ? <Alert variant="danger">{error}</Alert> : undefined}
                            {success ? <Alert variant="success">You've successfully registed</Alert> : undefined}

                            <Form onSubmit={handleFormSubmit}>

                                <FormGroup controlId="formGroupEmail">
                                    <FormLabel>Email address:</FormLabel>
                                    <FormControl type="email" name="email" value={user.email}
                                        placeholder="Enter email"
                                        onChange={handleFormChange} />
                                </FormGroup>

                                <FormGroup controlId="formGroupPassword">
                                    <FormLabel>Password:</FormLabel>
                                    <FormControl type="password" name="password" value={user.password}
                                        placeholder="Password" onChange={handleFormChange} />
                                </FormGroup>

                                <FormGroup controlId="formGroupRePassword">
                                    <FormLabel>Re-enter your Password:</FormLabel>
                                    <FormControl type="password" name="repassword" value={user.repassword}
                                        placeholder="Re-enter Password" onChange={handleFormChange} />
                                </FormGroup>

                                <FormGroup controlId="formGroupLanguage">
                                    <FormLabel>Choose your language:</FormLabel>
                                    <div >
                                        {
                                            languageList.map((language, index) => {
                                                return (<FormCheck key={index} custom
                                                    type="radio" name="language" id={`language-` + index}
                                                    onChange={handleFormChange} checked={user.language === language}
                                                    label={language} value={language} />)
                                            })
                                        }
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="formGroupGender">
                                    <FormLabel>Choose your gender:</FormLabel>
                                    <FormControl as="select" value={user.gender} name="gender" onChange={handleFormChange}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </FormControl>
                                </FormGroup>

                                <FormGroup controlId="formGroupReceiveEmail">
                                    <FormLabel>Receive email?</FormLabel>
                                    <FormCheck custom type="checkbox" name="receiveemail"
                                        id="receive-email" checked={user.receiveemail ? true : false}
                                        label={user.receiveemail ? "Yes" : "No"} onChange={handleFormChange}
                                        value={user.receiveemail} />
                                </FormGroup>
                                <FormGroup>
                                    <div className="text-right">
                                        <Button variant="primary" type="submit">Submit</Button>
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

export default SignUp

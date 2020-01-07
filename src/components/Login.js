import React from 'react'
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button, FormCheck, Alert } from 'react-bootstrap'

function Login() {
    return (
        <div>
            <Container>
                <Row>
                    <Col md={{ span: 7, offset: 2 }}>
                    <div className="c-form">
                        <h1 class="c-form-title">SIGN IN</h1>
                        <Form>
                            <FormGroup as={Row} controlId="formHorizontalEmail">
                                <FormLabel column sm={2}>Email</FormLabel>
                                <Col sm={10}>
                                    <FormControl type="email" placeholder="Email" />
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} controlId="formHorizontalPassword">
                                <FormLabel column sm={2}>Password</FormLabel>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" />
                                </Col>
                            </FormGroup>


                            <FormGroup as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button type="submit">Sign in</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login

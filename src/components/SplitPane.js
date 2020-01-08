import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function SplitPane(props) {
    return (
        <div>
            <Container>
                <Row>
                    <Col sm={4}>
                        {props.left}
                    </Col>
                    <Col sm={8}>
                        {props.right}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SplitPane

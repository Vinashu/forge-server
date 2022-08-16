import React from 'react';
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import { VariableList } from '.';
import { VscVariableGroup } from 'react-icons/vsc';

function Variable() {
    return(
        <>
        <Container fluid='true'>
            <Row className="justify-content-md-center">
                <h1 className='center'><VscVariableGroup /> Variable</h1>
                <Col xs={4}>
                    <Row className="justify-content-md-center">
                        <VariableList />
                    </Row>
                </Col>
                <Col xs={1}>
                </Col>
                <Col xs={7}>
                    <Row className="justify-content-md-center">
                        <Outlet />
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default Variable;
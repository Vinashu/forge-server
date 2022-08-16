import React from 'react';
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import { TargetList } from '.';
import { FiTarget } from 'react-icons/fi';

function Target() {
    return(
        <>
        <Container fluid='true'>
            <Row className="justify-content-md-center">
                <h1 className='center'><FiTarget /> Target</h1>
                <Col xs={4}>
                    <Row className="justify-content-md-center">
                        <TargetList />
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

export default Target;
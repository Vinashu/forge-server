import React from 'react';
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import { OperationList } from '.';
import { TbMathSymbols } from 'react-icons/tb';

function Operation() {
    return(
        <>
        <Container fluid='true'>
            <Row className="justify-content-md-center">
                <h1 className='center'><TbMathSymbols /> Operation</h1>
                <Col xs={4}>
                    <Row className="justify-content-md-center">
                        <OperationList />
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

export default Operation;
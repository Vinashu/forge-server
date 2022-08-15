import React from 'react';
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import { CategoryList } from './';
import { MdOutlineCategory } from 'react-icons/md';

function Category() {
    return(
        <>
        <Container fluid='true'>
            <Row className="justify-content-md-center">
                <h1 className='center'><MdOutlineCategory /> Category</h1>
                <Col xs={4}>
                    <Row className="justify-content-md-center">
                        <CategoryList />
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

export default Category;
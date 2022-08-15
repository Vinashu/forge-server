import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {Outlet} from "react-router-dom";
import {CategoryList} from './';

function Category() {
    return(
        <>
        <Container fluid='true'>
            <Row className="center">
                <h1>Category</h1>
                <Col xs={4}>
                    <Row className="center">
                        <CategoryList />
                    </Row>
                </Col>
                <Col xs={1}>
                </Col>
                <Col xs={7}>
                    <Row className="center">
                        <Outlet />
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default Category;
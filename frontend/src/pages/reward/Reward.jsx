import React from 'react';
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import { RewardList } from '.';
import { GiWantedReward } from 'react-icons/gi';

function Reward() {
    return(
        <>
        <Container fluid='true'>
            <Row className="justify-content-md-center">
                <h1 className='center'><GiWantedReward /> Reward</h1>
                <Col xs={4}>
                    <Row className="justify-content-md-center">
                        <RewardList />
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

export default Reward;
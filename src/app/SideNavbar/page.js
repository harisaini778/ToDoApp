"use client"

import React from 'react';
import { Card, Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { BsPerson, BsCalendar, BsCheck, BsExclamationCircle, BsXCircle } from 'react-icons/bs';
import { Stack } from 'react-bootstrap';
import './page.css';

const LeftOffcanvas = ({ show, handleClose }) => {
    return (
    <div>
        { show ? <Card className="card-container">
            <Card.Body>
                <Card.Title className="card-title">TO-DO-LIST</Card.Title>
                <Container>
                    <Row style={{ marginTop: '20px' }}>
                        <Col>
                            <h5 className="todays-tasks-title">Todays Task</h5>
                            <Row className="task-label" style={{ marginTop: '10px' }}>
                                <Col>
                                    <Stack direction='horizontal' gap={5}>
                                        <h6>Important Tasks</h6>
                                        <Badge bg="warning">3</Badge>
                                    </Stack>
                 
                                </Col>
                            </Row>
                            <Row className="task-label" style={{ marginTop: '10px' }}>
                                <Col>
                                    <Stack direction='horizontal' gap={5}>
                                        <h6>Completed Tasks</h6>
                                        <Badge bg="success">5</Badge>
                                    </Stack>
                                  
                
                                </Col>
                            </Row>
                            <Row className="task-label" style={{ marginTop: '10px' }}>
                                <Col>
                                    <Stack direction='horizontal' gap={5}>
                                        <h6>Uncompleted Tasks</h6>
                                        <Badge bg="danger">2</Badge>
                                    </Stack>
                 
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '20px' }}>
                        <Col>
                            <h5 className="todays-tasks-title">All Tasks</h5>
                            <Stack direction="horizontal" gap={3}>
                                <BsPerson size={20} />
                                <BsCalendar size={20} />
                                <BsCheck size={20} />
                                <BsExclamationCircle size={20} />
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
            <Button variant="secondary" onClick={handleClose} className="close-button">
                <BsXCircle size={20} style={{ marginBottom: '3px' }} /> Close
            </Button>
            </Card> : <div></div>}
            </div>
  );
};

export default LeftOffcanvas;

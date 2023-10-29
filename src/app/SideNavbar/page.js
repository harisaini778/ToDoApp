"use client"

import React,{useEffect,useState} from 'react';
import { Card, Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { BsPerson, BsCalendar, BsCheck, BsExclamationCircle, BsXCircle, BsPlus } from 'react-icons/bs';
import { Stack } from 'react-bootstrap';
import './page.css';

const LeftOffcanvas = ({ show, handleClose }) => {

  const [isSmaller, setIsSmaller] = useState(window.innerWidth < 576);

  useEffect(() => {

    const handleResize = () => {
      setIsSmaller(window.innerWidth < 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

   }, []);


  return (
    <div>
      {show ? (
        <Card className="card-container-sideNavbar" style={{position:isSmaller? "static":"fixed"}}>
          <Card.Body>
            <Container>
              <Card.Title className="card-title">TO-DO-LIST</Card.Title>
            </Container>
            <Container>
              <Row style={{ marginTop: '20px' }}>
                <Col>
                  <Button className="add-new-task-btn" size="sm">
                    <Stack direction="horizontal" gap={1}>
                      <BsPlus size={20} />
                      <span>Add task</span>
                    </Stack>
                  </Button>
                  <h6 className="todays-tasks-title">Today's Tasks</h6>
                  <Row className="task-label" style={{ marginTop: '10px' }}>
                    <Col>
                      <Stack direction="horizontal" gap={1}>
                        <span className='me-auto'>Important Tasks</span>
                        <Badge bg="warning" className="ms-auto my-auto">
                          3
                        </Badge>
                      </Stack>
                    </Col>
                  </Row>
                  <Row className="task-label" style={{ marginTop: '10px' }}>
                    <Col>
                      <Stack direction="horizontal" gap={1}>
                        <span className='me-auto'>Completed Tasks</span>
                        <Badge bg="success" className="ms-auto my-auto">
                          5
                        </Badge>
                      </Stack>
                    </Col>
                  </Row>
                  <Row className="task-label" style={{ marginTop: '10px' }}>
                    <Col>
                      <Stack direction="horizontal">
                        <span className='me-auto'>Uncompleted Tasks</span>
                        <Badge bg="danger" className="ms-auto my-auto">
                          2
                        </Badge>
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
              <Row>
                <Col>
                  <Button variant="danger" onClick={handleClose} className="mt-4" size='sm'>
                    <Stack direction="horizontal" gap={2}>
                      <BsXCircle size={16} />
                      <span>Close</span>
                    </Stack>
                  </Button>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default LeftOffcanvas;

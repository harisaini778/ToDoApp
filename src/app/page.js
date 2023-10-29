"use client"

import React,{useState} from 'react';
import { Navbar, Container, FormControl, Button, Nav,Stack,Row,Col,Badge } from 'react-bootstrap';
import { BsSearch, BsFillPersonFill, BsPlus, BsHouseDoorFill, BsCheckCircle, BsCalendar2CheckFill } from 'react-icons/bs';
import LeftOffcanvas from './SideNavbar/page';
import TaskModal from "./TaskModal/page";
import TaskCard from './TaskCard/page';
import "./style.css";

const Home = () => {

  const [show, setShow] = useState(true); 

  const handleClose = () => setShow(false); 

  const today = new Date();
  const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

  return (
    <div>
    <Navbar variant="dark" expand="lg" className='gradient-background p-2'  style={{ zIndex: 1000,width:"100vw" }}>
        <Container>
          <Navbar.Brand>
          <div className='navbar-brand '>Next ToDo's</div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Stack direction='horizontal' gap={3}>
              <FormControl
                type="search"
                placeholder="Find your todos"
                aria-label="Search"
              />
              <Button variant="outline-light">
                <BsSearch />
              </Button>
            
                
                
              <Button variant="outline-light" style={{ textWrap: "nowrap" }}>
                
                <Stack direction='horizontal'>
                <BsPlus size={30} />
                <div>Add new task</div>
                   </Stack>
                </Button>
             
          
              </Stack>
            </Nav>
          <Nav>
            <Stack direction='horizontal' gap={3}>
              <BsCalendar2CheckFill size={20}/>
              <span style={{ color: 'white' }}>{date}</span>
              <BsFillPersonFill color="white" size={25} />
              <span style={{ color: 'white' }}>Hari</span>
              <BsCheckCircle color="white" size={25} />
              
            </Stack>
     
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
       
       <div  style={{ paddingTop: "80px", position: "relative", overflow: "auto",overflowX:"hidden" }}>
        <Row>
          <Col lg={2}>  <LeftOffcanvas show={show} handleClose={handleClose} /> </Col>
        <Col lg={7}>
          <TaskCard/>
        </Col>
        <Col lg={3}><TaskModal show={show} handleClose={handleClose} /></Col>
        </Row>
      </div>
      
     </div>
  );
};

export default Home;

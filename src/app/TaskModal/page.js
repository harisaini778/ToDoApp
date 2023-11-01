"use client"

import React, { useRef,useState,useEffect } from 'react';
import { Card, Form, Button, Stack } from 'react-bootstrap';
import { BsPlus, BsXCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTaskModelHandler } from '../store/Features/slices/dataStore';
import './page.css';

const TaskModal = () => {


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

  const dispatch = useDispatch();

  const editIsClicked = useSelector((state) => state.todoSlice.editIsClicked);
  const editedList = useSelector((state) => state.todoSlice.editedIncompleteTasks);
    
  useEffect(() => { 

    if (editIsClicked) {

    const obj = editedList[0]; // Assuming you want to handle the first item

    titleRef.current.value = obj.title;
    dateRef.current.value = obj.date;
    descriptionRef.current.value = obj.description;
      
    }

  }, [editIsClicked, editedList]);

  const modalDisplayHandler = () => {
    dispatch(toggleTaskModelHandler());
  };

  const show = useSelector((state) => state.todoSlice.showTaskModal);

  const titleRef = useRef(null);
  const dateRef = useRef(null);
  const descriptionRef = useRef(null);

  const addTodoHandler = async () => {
   
    if (editIsClicked) {
    
      const obj = editedList[0]; // Assuming you want to handle the first item
        
      const editedObj = {
        title: titleRef.current.value,
        date: dateRef.current.value,
        description: descriptionRef.current.value,
      };

      try {
        const response = await fetch(`http://localhost:3000/api/${obj._id}`, {
          method: "PUT",
          body: JSON.stringify(editedObj),
          headers: {
            "Content-Type": "application/json"
          },
        });


        const data = await response.json();

        alert("You have successfully edited your task!");

        titleRef.current.value = '';
        dateRef.current.value = '';
        descriptionRef.current.value = '';

        console.log(data);

      } catch (error) {
        alert(error)
        throw new Error(error);
      }
      


    } else {
      const obj = {
        title: titleRef.current.value,
        date: dateRef.current.value,
        description: descriptionRef.current.value,
      };

      const clearFormHandler = () => {
        titleRef.current.value = '';
        dateRef.current.value = '';
        descriptionRef.current.value = '';
      };

      try {
        const response = await fetch('http://localhost:3000/api', {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log(data);

        alert('You have successfully added your task!');

        clearFormHandler();
      } catch (error) {
        console.log('Error occurred while adding the task! ', error);
        alert('Error occurred while adding the task!');
      }
    }
  };

  return (
    <div>
      <Card className='card-container-taskModal' style={{position:isSmaller?"static":"fixed"}}>
        <Card.Header className='card-header-taskModal'>
          <h5 className='mx-auto my-auto p-1'>Add a Task</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label><h5>Title</h5></Form.Label>
              <Form.Control type="text" placeholder="Enter title" className="p-2" ref={titleRef} />
            </Form.Group>
            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label><h5>Date</h5></Form.Label>
              <Form.Control type="date" className="p-2" ref={dateRef} />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label><h5>Description</h5></Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" className="p-2" ref={descriptionRef} />
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer>
          <Stack direction="horizontal">
            <Button variant="danger" onClick={modalDisplayHandler} className='mx-auto my-auto' size='sm'>
              <Stack direction='horizontal' gap={1}>
                <BsXCircle size={15} />
                <div>Close</div>
              </Stack>
            </Button>
            <Button  onClick={addTodoHandler} className='mx-auto my-auto add-btn' size='sm'>
              <Stack direction='horizontal'>
                <BsPlus size={20} />
                <div>Add task</div>
              </Stack>
            </Button>
          </Stack>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default TaskModal;

"use client"

import React, { useRef } from 'react';
import { Card, Form, Button, Stack } from 'react-bootstrap';
import { BsPlus, BsXCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTaskModelHandler } from '../store/Features/slices/dataStore';
import './page.css';

const TaskModal = () => {
  const dispatch = useDispatch();

  const modalDisplayHandler = () => {
    dispatch(toggleTaskModelHandler());
  };

  const show = useSelector((state) => state.todoSlice.showTaskModal);

  const titleRef = useRef(null);
  const dateRef = useRef(null);
  const descriptionRef = useRef(null);

  const addTodoHandler = async () => {
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
  };

  return (
    <div>
      <Card className='card-container-taskModal'>
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
              <Stack direction='horizontal' gap={2}>
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

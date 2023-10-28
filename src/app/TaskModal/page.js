"use client"

import React, { useRef } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTaskModelHandler } from '../store/Features/slices/dataStore';

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
    <Card style={{ display: show ? 'block' : 'none' }}>
      <Card.Header>Add a Task</Card.Header>
      <Card.Body>
        <Form className="p-3">
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" className="p-2" ref={titleRef} />
          </Form.Group>
          <Form.Group controlId="formDate" className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" className="p-2" ref={dateRef} />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" className="p-2" ref={descriptionRef} />
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary" onClick={modalDisplayHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={addTodoHandler}>
          <BsPlus style={{ marginRight: '5px' }} />
          Add new task
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default TaskModal;

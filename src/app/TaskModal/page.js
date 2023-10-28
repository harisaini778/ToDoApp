"use client"

import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';

const TaskModal = () => {


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="p-3">
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" className="p-2" />
          </Form.Group>
          <Form.Group controlId="formDate" className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" className="p-2" />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" className="p-2" />
          </Form.Group>
          <Form.Group controlId="formDropdown" className="mb-3">
            <Form.Label>Mark as</Form.Label>
            <Form.Select className="p-2">
              <option>Choose...</option>
              <option>Important</option>
              <option>Completed</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">
          <BsPlus style={{ marginRight: '5px' }} />
          Add new task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;

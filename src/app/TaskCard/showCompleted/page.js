"use client"

import React, { useState, useEffect } from "react";
import { Card, Button,Row,Col } from "react-bootstrap";
import { AiFillStar, AiFillCheckCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

const CompletedTask = () => {
  
  const allTasks = useSelector((state) => state.todoSlice.completedTasks);


  return (
    <div>
          <div style= {{ textAlign: "center", color: "#2ecc71", fontWeight: "bolder", fontSize: "1.5rem",display:"flex",justifyContent:"center" }}
          className="mt-3 mb-2">
              <h style={{borderBottom:"3px solid #2ecc71"}}>Completed Task's</h></div>
          <Row> 
          {allTasks.map((task) => (
         <Col key={task._id} lg={6}>
        <Card className="mt-2" style={{boxShadow: "2px 2px 4px rgba(0,0,0,0.5)"}}>
          <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{task.date}</Card.Subtitle>
            <Card.Text style={{textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{task.description}</Card.Text>

            <Button
              variant="warning"
            >
            <AiFillStar />
            </Button>{" "}
            <Button
              variant="success"
            >
              <AiFillCheckCircle />
            </Button>{" "}
          </Card.Body>
                  </Card>
                      </Col>
          ))}
          </Row>
    </div>
  );
};

export default CompletedTask;

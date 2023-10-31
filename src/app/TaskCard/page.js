"use client"

import React, { useState, useEffect } from "react";
import { Card, Button,Row,Col } from "react-bootstrap";
import { AiFillStar, AiFillCheckCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTodo } from "../store/Features/slices/dataStore";
//import { markAsImportant } from "../store/Features/slices/dataStore";
//import Link from "next/link";

const TaskCard = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.todoSlice.incompleteTasks);
    console.log("all tasks are : ", allTasks);
  useEffect(() => {
    dispatch(fetchAllTodo());
  }, [dispatch]);

  const [isImportant, setIsImportant] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleToggleImportant = async (taskId,taskDes,taskDate,taskTitle) => {
      setIsImportant(!isImportant);
      //dispatch(markAsImportant(taskId))
      const obj = {
          title: taskTitle,
          date: taskDate,
          description: taskDes,
      };
      try {
          const response = await fetch("/api/importantTaskRoute", {
              method: "POST",
              body: JSON.stringify( obj ),
              headers: {
                  "Content-Type": "application/json"
              },
              
          });

          const data = await response.json();
          console.log("Post request data Important Task Component is : ", data);
          alert("You have successfully marked your task!")
      }
      catch (error) {
          console.log(error)
      }
    
    // Making a delete reuqest to delete the data from the todoData

      try {
    const response = await fetch(`http://localhost:3000/api/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);

    alert('You have successfully deleted the task!');
  } catch (error) {
    console.log('Error occurred while deleting the task! ', error);
    alert('Error occurred while deleting the task!');
  }

  };

  const handleToggleCompleted = async (taskId,taskDes,taskDate,taskTitle) => {
      setIsCompleted(!isCompleted);
         const obj = {
          title : taskTitle,
          date: taskDate,
          description : taskDes,
      }
       try {
          const response = await fetch("/api/completedTaskRoute", {
              method: "POST",
              body: JSON.stringify(obj),
              headers: {
                  "Content-Type": "application/json"
              },
              
          });

          const data = await response.json();
          console.log("Post request data Important Task Component is : ", data);
          alert("You have successfully marked your task!")
      }
      catch (error) {
          console.log(error)
      }

      // Making a delete reuqest to delete the data from the todoData

      try {
    const response = await fetch(`http://localhost:3000/api/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);

    alert('You have successfully deleted the task!');
  } catch (error) {
    console.log('Error occurred while deleting the task! ', error);
    alert('Error occurred while deleting the task!');
      }
      
  };

  return (
    <div>
          <div style= {{ textAlign: "center", color: "#2ecc71", fontWeight: "bolder", fontSize: "1.5rem",display:"flex",justifyContent:"center" }}
          className="mt-3 mb-2">
              <h style={{borderBottom:"3px solid #2ecc71"}}>Pending Task's</h></div>
          <Row> 
          {allTasks.map((task) => (
         <Col key={task._id} lg={6}>
        <Card className="mt-2" style={{boxShadow: "2px 2px 4px rgba(0,0,0,0.5)"}}>
          <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{task.date}</Card.Subtitle>
            <Card.Text style={{textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{task.description}</Card.Text>
        
            <Button
              variant={isImportant ? "warning" : "outline-warning"}
              onClick={()=>handleToggleImportant(task._id,task.date,task.title,task.description)}
            >
            <AiFillStar />
            </Button>{" "}
                     
         
            <Button
              variant={isCompleted ? "success" : "outline-success"}
              onClick={()=>handleToggleCompleted(task._id,task.date,task.title,task.description)}
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

export default TaskCard;

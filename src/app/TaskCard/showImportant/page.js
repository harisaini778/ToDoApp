"use client"

// ImportantTask.js

import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllImportantTodo } from "../../store/Features/slices/dataStore";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";

const ImportantTask = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllImportantTodo());
    }, []);

    const allTasks = useSelector((state) => state.todoSlice.importantTasks);

    return (
        <Container>
            <Link href="/">
                <Button className="mt-4 mb-2" variant="success">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <BsArrowLeft size={24} />
                        <span style={{ marginLeft: "5px" }}>Go Back</span>
                    </div>
                </Button>
            </Link>
            <div style={{ textAlign: "center", color: "#2ecc71", fontWeight: "bolder", fontSize: "1.5rem", marginTop: "20px", marginBottom: "40px" }}>
                <h style={{ borderBottom: "3px solid #2ecc71" }}>Important Task's</h>
            </div>
            <Row>
                {allTasks.map((task) => (
                    <Col key={task._id} lg={3}>
                        <Card className="mt-2" style={{ boxShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
                            <Card.Body>
                                <Card.Title>{task.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{task.date}</Card.Subtitle>
                                <Card.Text style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{task.description}</Card.Text>

                                <Button variant="warning">
                                    <AiFillStar />
                                </Button>{" "}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ImportantTask;

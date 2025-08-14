import React from "react";
import { Card, Button } from "react-bootstrap";

const StudentCard = ({ student }) => {
    return (
        <Card className="mb-4 h-100">
            <Card.Img
                variant="top"
                src={student.avatar}
                alt={`${student.name}'s avatar`}
                style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{student.name}</Card.Title>
                <Card.Text>Age: {student.age}</Card.Text>
                <Button variant="primary" className="mt-auto">Edit</Button>
            </Card.Body>
        </Card>
    );
};

export default StudentCard;
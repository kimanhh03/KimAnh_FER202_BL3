import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import StudentCard from "./Components/StudentCard";
import Welcome from "./Components/Welcome";
import UserProfile from "./Components/UserProfile";
import NameList from "./Components/NameList";

function App() {
  const userData = { name: "traltb@fe.edu.vn", age: 39 };
  const namesList = ["traltb@fe.edu.vn", "test@fe.edu.vn"];
  
  const students = [
    { name: "traltb1@fe.edu.vn", age: 21, avatar: "/images/student1.jpg" },
    { name: "traltb2@fe.edu.vn", age: 21, avatar: "/images/student2.avif" },
    { name: "traltb3@fe.edu.vn", age: 22, avatar: "/images/student3.jpg" },
  ];

  return (
    <>
      <Welcome name="traltb@fe.edu.vn" />
      <Welcome name="fptdn@fe.edu.vn" />
      
      <UserProfile user={userData} />
      
      <NameList names={namesList} />
      
      <Container>
        <h1 className="my-4 text-center">Student information</h1>
        <Row>
          {students.map((student, index) => (
            <Col key={index} sm={12} md={4}>
              <StudentCard student={student} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
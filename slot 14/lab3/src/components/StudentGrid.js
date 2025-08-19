import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StudentCard from './StudentCard';

const StudentGrid = ({ students, onViewDetails, onDelete }) => {
  return (
    <Row className="g-4">
      {students.map(student => (
        <Col key={student.id} xs={12} md={6} lg={4}>
          <StudentCard
            student={student}
            onViewDetails={onViewDetails}
            onDelete={onDelete}
          />
        </Col>
      ))}
    </Row>
  );
};

export default StudentGrid;
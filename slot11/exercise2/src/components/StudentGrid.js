import React from 'react';
import StudentCard from './StudentCard';

const StudentGrid = ({ students, onViewDetails, onDelete }) => {
  return (
    <div className="row g-4">
      {students.map(student => (
        <div key={student.id} className="col-12 col-md-6 col-lg-4">
          <StudentCard
            student={student}
            onViewDetails={onViewDetails}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default StudentGrid;
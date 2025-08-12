import React, { useState, useMemo } from 'react';

const PersonList = ({ persons }) => {
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedPersons = useMemo(() => {
    return [...persons].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.firstName.localeCompare(b.firstName);
      } else {
        return b.firstName.localeCompare(a.firstName);
      }
    });
  }, [persons, sortOrder]);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4>Person List</h4>
        <button 
          className="btn btn-primary"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort First Name: {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
        </button>
      </div>
      <div className="card-body">
        <div className="row">
          {sortedPersons.map(({id, firstName, lastName, age, city, skills}) => (
            <div key={id} className="col-md-6 mb-3">
              <div className="card border-secondary">
                <div className="card-body">
                  <h5 className="card-title">{firstName} {lastName}</h5>
                  <p className="card-text">
                    <strong>Age:</strong> {age}<br/>
                    <strong>City:</strong> {city}<br/>
                    <strong>Skills:</strong> {skills.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonList;
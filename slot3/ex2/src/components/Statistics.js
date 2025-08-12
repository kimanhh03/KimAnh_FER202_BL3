import React, { useMemo } from 'react';

const Statistics = ({ persons }) => {
  const statistics = useMemo(() => {
    return persons.reduce((acc, person) => {
      acc.totalPersons++;
      acc.totalAge += person.age;
      if (person.isActive) acc.activePersons++;
      return acc;
    }, { totalPersons: 0, totalAge: 0, activePersons: 0 });
  }, [persons]);

  const averageAge = statistics.totalPersons > 0 ? (statistics.totalAge / statistics.totalPersons).toFixed(1) : 0;

  return (
    <div className="row mb-3">
      <div className="col-md-12">
        <div className="card bg-light">
          <div className="card-body">
            <h5 className="card-title">Statistics</h5>
            <div className="row text-center">
              <div className="col-md-4">
                <h6>Total Persons</h6>
                <span className="badge bg-primary fs-6">{statistics.totalPersons}</span>
              </div>
              <div className="col-md-4">
                <h6>Average Age</h6>
                <span className="badge bg-info fs-6">{averageAge}</span>
              </div>
              <div className="col-md-4">
                <h6>Active Persons</h6>
                <span className="badge bg-success fs-6">{statistics.activePersons}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
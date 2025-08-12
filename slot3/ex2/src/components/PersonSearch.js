import React, { useState, useMemo } from 'react';
import Statistics from './Statistics';

const PersonSearch = ({ persons }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchAndSortedPersons = useMemo(() => {
    let filtered = persons;

    if (searchTerm) {
      filtered = filtered.filter(person => {
        const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
    }

    filtered.sort((a, b) => {
      if (a.isActive !== b.isActive) {
        return b.isActive - a.isActive;
      }
      if (a.age !== b.age) {
        return a.age - b.age;
      }
      return a.lastName.localeCompare(b.lastName);
    });

    return filtered;
  }, [persons, searchTerm]);

  return (
    <div className="card">
      <div className="card-header">
        <h4>Search Persons</h4>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Search by Name:</label>
          <input 
            type="text" 
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter first name or last name..."
          />
        </div>

        <Statistics persons={searchAndSortedPersons} />

        <div className="results">
          <h5>Results (sorted by: Active → Age → Last Name)</h5>
          {searchAndSortedPersons.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Skills</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {searchAndSortedPersons.map(({id, firstName, lastName, age, city, skills, isActive}) => (
                    <tr key={id} className={isActive ? 'table-success' : 'table-light'}>
                      <td><strong>{firstName} {lastName}</strong></td>
                      <td>{age}</td>
                      <td>{city}</td>
                      <td>{skills.join(', ')}</td>
                      <td>
                        <span className={`badge ${isActive ? 'bg-success' : 'bg-secondary'}`}>
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-warning">No results found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonSearch;
import React, { useState, useMemo } from 'react';

const PersonFilter = ({ persons }) => {
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  const allSkills = useMemo(() => {
    const skillSet = new Set();
    persons.forEach(person => {
      person.skills.forEach(skill => skillSet.add(skill));
    });
    return Array.from(skillSet).sort();
  }, [persons]);

  const filteredPersons = useMemo(() => {
    let filtered = persons;

    if (minAge !== '' || maxAge !== '') {
      filtered = filtered.filter(person => {
        const min = minAge !== '' ? parseInt(minAge) : 0;
        const max = maxAge !== '' ? parseInt(maxAge) : 999;
        return person.age >= min && person.age <= max;
      });
    }

    if (selectedSkill) {
      filtered = filtered.filter(person => person.skills.includes(selectedSkill));
    }

    return filtered;
  }, [persons, minAge, maxAge, selectedSkill]);

  return (
    <div className="card">
      <div className="card-header">
        <h4>Filter Persons</h4>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Min Age:</label>
            <input 
              type="number" 
              className="form-control"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              placeholder="Min age"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Max Age:</label>
            <input 
              type="number" 
              className="form-control"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              placeholder="Max age"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Skill:</label>
            <select 
              className="form-control"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <option value="">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setMinAge('');
                setMaxAge('');
                setSelectedSkill('');
              }}
            >
              Clear
            </button>
          </div>
        </div>
        
        <div className="results">
          {filteredPersons.length > 0 ? (
            <ul className="list-group">
              {filteredPersons.map(({id, firstName, lastName, skills}) => (
                <li key={id} className="list-group-item">
                  {firstName} -- {lastName} -- {skills.join(', ')}
                </li>
              ))}
            </ul>
          ) : (
            <div className="alert alert-warning">No found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonFilter;
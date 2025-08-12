import React, { useState } from 'react';
import { persons } from './Person.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonList from './components/PersonList';
import PersonFilter from './components/PersonFilter';
import SkillRanking from './components/SkillRanking';
import PersonSearch from './components/PersonSearch';

const App = () => {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">Person Management System</h1>
      
      <ul className="nav nav-pills mb-4 justify-content-center">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            Person List
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'filter' ? 'active' : ''}`}
            onClick={() => setActiveTab('filter')}
          >
            Filter Persons
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'ranking' ? 'active' : ''}`}
            onClick={() => setActiveTab('ranking')}
          >
            Skill Ranking
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            Search Persons
          </button>
        </li>
      </ul>

      {activeTab === 'list' && <PersonList persons={persons} />}
      {activeTab === 'filter' && <PersonFilter persons={persons} />}
      {activeTab === 'ranking' && <SkillRanking persons={persons} />}
      {activeTab === 'search' && <PersonSearch persons={persons} />}
    </div>
  );
};

export default App;
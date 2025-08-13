import React, { useState } from 'react';

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  prepTimeFilter,
  setPrepTimeFilter,
  cookTimeFilter,
  setCookTimeFilter
}) => {
  const [showPrepDropdown, setShowPrepDropdown] = useState(false);
  const [showCookDropdown, setShowCookDropdown] = useState(false);

  const handlePrepTimeSelect = (time) => {
    setPrepTimeFilter(time);
    setShowPrepDropdown(false);
  };

  const handleCookTimeSelect = (time) => {
    setCookTimeFilter(time);
    setShowCookDropdown(false);
  };

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="d-flex flex-wrap gap-3 justify-content-center align-items-center">
            <div className="dropdown">
              <button 
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                onClick={() => setShowPrepDropdown(!showPrepDropdown)}
                style={{minWidth: '120px'}}
              >
                Prep: {prepTimeFilter || 'Any'}
              </button>
              <ul className={`dropdown-menu ${showPrepDropdown ? 'show' : ''}`}>
                <li><button className="dropdown-item" onClick={() => handlePrepTimeSelect('')}>Any</button></li>
                <li><button className="dropdown-item" onClick={() => handlePrepTimeSelect('5 mins')}>5 mins</button></li>
                <li><button className="dropdown-item" onClick={() => handlePrepTimeSelect('10 mins')}>10 mins</button></li>
                <li><button className="dropdown-item" onClick={() => handlePrepTimeSelect('15 mins')}>15 mins</button></li>
              </ul>
            </div>

            <div className="dropdown">
              <button 
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                onClick={() => setShowCookDropdown(!showCookDropdown)}
                style={{minWidth: '120px'}}
              >
                Cook: {cookTimeFilter || 'Any'}
              </button>
              <ul className={`dropdown-menu ${showCookDropdown ? 'show' : ''}`}>
                <li><button className="dropdown-item" onClick={() => handleCookTimeSelect('')}>Any</button></li>
                <li><button className="dropdown-item" onClick={() => handleCookTimeSelect('0 min')}>0 min</button></li>
                <li><button className="dropdown-item" onClick={() => handleCookTimeSelect('5 mins')}>5 mins</button></li>
                <li><button className="dropdown-item" onClick={() => handleCookTimeSelect('10 mins')}>10 mins</button></li>
                <li><button className="dropdown-item" onClick={() => handleCookTimeSelect('12 mins')}>12 mins</button></li>
                <li><button className="dropdown-item" onClick={() => handleCookTimeSelect('15 mins')}>15 mins</button></li>
                <li><button className="dropdown-item" onClick={() => handleCookTimeSelect('20 mins')}>20 mins</button></li>
              </ul>
            </div>

            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{width: '280px'}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
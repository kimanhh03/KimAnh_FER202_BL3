import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  
  const categories = [...new Set(companies.map(company => company.category))];
  
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || company.category === categoryFilter;
    const matchesStartYear = !startYear || company.start >= parseInt(startYear);
    const matchesEndYear = !endYear || company.start <= parseInt(endYear);
    
    return matchesSearch && matchesCategory && matchesStartYear && matchesEndYear;
  });
  
  const sortedCompanies = filteredCompanies.sort((a, b) => {
    if (sortBy === 'yearAsc') return a.start - b.start;
    if (sortBy === 'yearDesc') return b.start - a.start;
    return a.name.localeCompare(b.name);
  });
  
  const handleSearch = () => {
    console.log('Search clicked');
  };
  
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Company List</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <input 
                  type="text"
                  className="form-control"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  className="btn btn-primary" 
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-3">
              <select 
                className="form-select"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="yearAsc">Year Ascending</option>
                <option value="yearDesc">Year Descending</option>
              </select>
            </div>
            
            <div className="col-md-3">
              <select 
                className="form-select"
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-3">
              <input 
                type="number" 
                className="form-control"
                placeholder="Start Year From"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
              />
            </div>
            
            <div className="col-md-3">
              <input 
                type="number" 
                className="form-control"
                placeholder="Start Year To"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {sortedCompanies.length === 0 ? (
        <div className="alert alert-info text-center">
          <h5>No result</h5>
          <p className="mb-0">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Company Name</th>
                <th>Category</th>
                <th>Start Year</th>
                <th>End Year</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {sortedCompanies.map((company, index) => (
                <tr key={index}>
                  <td className="fw-bold">{company.name}</td>
                  <td>
                    <span className={`badge ${
                      company.category === 'Technology' ? 'bg-primary' :
                      company.category === 'Finance' ? 'bg-success' :
                      company.category === 'Retail' ? 'bg-warning' :
                      'bg-secondary'
                    }`}>
                      {company.category}
                    </span>
                  </td>
                  <td>{company.start}</td>
                  <td>{company.end}</td>
                  <td>{company.end - company.start} years</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
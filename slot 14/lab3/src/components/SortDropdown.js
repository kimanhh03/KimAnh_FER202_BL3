import React from 'react';
import { Form } from 'react-bootstrap';
import { SortAsc } from 'lucide-react';

const SortDropdown = ({ sortBy, setSortBy }) => {
  return (
    <div className="mb-4">
      <Form.Label className="fw-semibold d-flex align-items-center">
        <SortAsc size={16} className="me-1" />
        Sort by
      </Form.Label>
      <Form.Select 
        value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)} 
        style={{ width: '200px' }}
      >
        <option value="default">Default</option>
        <option value="age-asc">Age (Ascending)</option>
        <option value="age-desc">Age (Descending)</option>
        <option value="name-az">Name (A-Z)</option>
        <option value="name-za">Name (Z-A)</option>
      </Form.Select>
    </div>
  );
};

export default SortDropdown;
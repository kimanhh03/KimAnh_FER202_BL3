import React from 'react';
import { SortAsc } from 'lucide-react';

const SortDropdown = ({ sortBy, setSortBy }) => (
  <div className="mb-4">
    <label className="form-label fw-semibold d-flex align-items-center">
      <SortAsc size={16} className="me-1" />
      Sort by
    </label>
    <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ width: '200px' }}>
      <option value="default">Default</option>
      <option value="age-asc">Age (Ascending)</option>
      <option value="age-desc">Age (Descending)</option>
      <option value="name-az">Name (A-Z)</option>
      <option value="name-za">Name (Z-A)</option>
    </select>
  </div>
);

export default SortDropdown;
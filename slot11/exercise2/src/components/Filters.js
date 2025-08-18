import { Search, Filter, Image } from 'lucide-react';

const Filters = ({ searchTerm, setSearchTerm, ageRange, setAgeRange, hasAvatar, setHasAvatar }) => (
  <div className="card shadow-sm mb-4">
    <div className="card-body">
      <h5 className="card-title mb-4 d-flex align-items-center">
        <Filter size={20} className="me-2 text-primary" />
        Filters
      </h5>
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label fw-semibold d-flex align-items-center">
            <Search size={16} className="me-1" />
            Search by name/email
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-semibold">Age Range</label>
          <select className="form-select" value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
            <option value="all">All Ages</option>
            <option value="<=20">≤ 20</option>
            <option value="21-25">21 - 25</option>
            <option value=">25">&gt; 25</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label fw-semibold d-flex align-items-center">
            <Image size={16} className="me-1" />
            Avatar Filter
          </label>
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={hasAvatar}
              onChange={(e) => setHasAvatar(e.target.checked)}
              id="avatarFilter"
            />
            <label className="form-check-label" htmlFor="avatarFilter">Has Avatar Only</label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Filters;
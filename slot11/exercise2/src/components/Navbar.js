import React from 'react';
import { Home, Users, Info, Search } from 'lucide-react';

const Navbar = ({ quickSearch, setQuickSearch }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid">
      <div className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row align-items-center">
        <a className="nav-link text-white me-3 d-flex align-items-center" href="#">
          <Home size={18} className="me-1" />
          Home
        </a>
        <a className="nav-link text-white me-3 d-flex align-items-center" href="#">
          <Users size={18} className="me-1" />
          Students
        </a>
        <a className="nav-link text-white me-3 d-flex align-items-center" href="#">
          <Info size={18} className="me-1" />
          About
        </a>
      </div>
      <div className="d-flex position-relative">
        <Search size={18} className="position-absolute text-muted" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }} />
        <input
          className="form-control ps-5"
          type="search"
          placeholder="Quick search..."
          value={quickSearch}
          onChange={(e) => setQuickSearch(e.target.value)}
          style={{ width: '250px' }}
        />
      </div>
    </div>
  </nav>
);

export default Navbar;
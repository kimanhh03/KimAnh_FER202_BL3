import React from 'react';
import Cart from './Cart';

const Header = ({ cartItems }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold text-success" href="#">
          Healthy Recipe Finder
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Recipes</a>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            <Cart cartItems={cartItems} />
            <button className="btn btn-success ms-3">
              Browse recipes
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
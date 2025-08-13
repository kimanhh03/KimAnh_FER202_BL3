import React from 'react';

const Header = ({ onShowRequestForm }) => {
  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <h2 className="text-success">Healthy Recipe Finder</h2>
      <nav className="d-flex align-items-center gap-3">
        <a href="#home" className="text-dark text-decoration-none">Home</a>
        <a href="#about" className="text-dark text-decoration-none">About</a>
        <a href="#recipes" className="text-dark text-decoration-none">Recipes</a>

        {/* Nút mới thay cho Browse Recipes */}
        <button
          className="btn btn-success"
          onClick={onShowRequestForm}
        >
          Request Recipe
        </button>
      </nav>
    </header>
  );
};

export default Header;

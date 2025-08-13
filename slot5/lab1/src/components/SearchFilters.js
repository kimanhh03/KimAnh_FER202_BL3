import React, { useState } from 'react';

const SearchFilters = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  totalItems
}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);

  const sortOptions = [
    { value: "name-asc", label: "Name A→Z" },
    { value: "name-desc", label: "Name Z→A" },
    { value: "prep-asc", label: "Prep ↑" },
    { value: "prep-desc", label: "Prep ↓" },
    { value: "cook-asc", label: "Cook ↑" },
    { value: "cook-desc", label: "Cook ↓" }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : "Sort by";
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`btn btn-sm mx-1 ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="container my-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search recipes by name or ingredient..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle w-100"
              type="button"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              {getCurrentSortLabel()}
            </button>
            <ul className={`dropdown-menu w-100 ${showSortDropdown ? 'show' : ''}`}>
              {sortOptions.map(option => (
                <li key={option.value}>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      onSortChange(option.value);
                      setShowSortDropdown(false);
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-3">
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle w-100"
              type="button"
              onClick={() => setShowItemsDropdown(!showItemsDropdown)}
            >
              {itemsPerPage} per page
            </button>
            <ul className={`dropdown-menu ${showItemsDropdown ? 'show' : ''}`}>
              {[6, 9, 12].map(num => (
                <li key={num}>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      onItemsPerPageChange(num);
                      setShowItemsDropdown(false);
                    }}
                  >
                    {num} per page
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} recipes
              </small>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-primary btn-sm me-1"
                onClick={handleFirstPage}
                disabled={currentPage === 1}
              >
                &lt;&lt;
              </button>
              <button
                className="btn btn-outline-primary btn-sm me-2"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              
              {renderPageNumbers()}
              
              <button
                className="btn btn-outline-primary btn-sm ms-2"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
              <button
                className="btn btn-outline-primary btn-sm ms-1"
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Search, SortAsc } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SearchFilter = ({ searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  const { theme } = useTheme();

  // Class theo theme
  const boxClass = theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";
  const inputClass = theme === "dark" ? "bg-secondary text-light" : "";

  return (
    <div className={`p-4 rounded mb-4 search-filter ${boxClass}`}>
      <Row className="g-3 align-items-end">
        <Col md={6}>
          <Form.Label className={`fw-semibold d-flex align-items-center ${theme === "dark" ? "text-light" : "text-dark"}`}>
            <Search size={16} className="me-1" />
            Search Products
          </Form.Label>
          <InputGroup>
            <InputGroup.Text className={boxClass}>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`search-input ${inputClass}`}
            />
          </InputGroup>
        </Col>

        <Col md={6}>
          <Form.Label className={`fw-semibold d-flex align-items-center ${theme === "dark" ? "text-light" : "text-dark"}`}>
            <SortAsc size={16} className="me-1" />
            Sort By
          </Form.Label>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`sort-select ${inputClass}`}
          >
            <option value="">Default</option>
            <option value="name">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </Form.Select>
        </Col>
      </Row>
    </div>
  );
};

export default SearchFilter;

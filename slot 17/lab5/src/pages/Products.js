import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import ProductCard from '../components/ProductCard';
import SearchFilter from '../components/SearchFilter';
import dishes from '../data/dishes';

const Products = () => {
  const { bgClass, textClass } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState(10);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = dishes.filter(dish => {
      const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = parseFloat(dish.price) <= priceRange;
      return matchesSearch && matchesPrice;
    });

    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, sortBy, priceRange]);

  return (
    <div className={`min-vh-100 ${bgClass} ${textClass}`}>
      <Container className="py-4">
        {/* Page Header */}
        <Row className="mb-4">
          <Col>
            <div className={`text-center mb-4 ${textClass}`}>
              <h1 className={`display-4 fw-bold mb-3 ${textClass}`}>Our Menu</h1>
              <p className={`lead ${textClass}`}>
                Discover our collection of authentic Indian dishes
              </p>
            </div>
          </Col>
        </Row>

        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        {/* Results Count */}
        <Row className="mb-3">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <span className={textClass}>
                Showing {filteredAndSortedProducts.length} of {dishes.length} products
              </span>
              {(searchTerm || sortBy || priceRange < 10) && (
                <small className={textClass}>
                  Filters active
                </small>
              )}
            </div>
          </Col>
        </Row>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <Row className="g-4">
            {filteredAndSortedProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="info" className="text-center">
                <h5>No products found</h5>
                <p className="mb-0">
                  Try adjusting your search criteria or filters.
                </p>
              </Alert>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Products;

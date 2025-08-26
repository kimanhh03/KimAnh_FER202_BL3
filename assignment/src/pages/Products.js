import React, { useState, useEffect, useMemo } from 'react'
import { Container, Row, Col, Form, InputGroup, Button, Badge, Card } from 'react-bootstrap'
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await axios.get('http://localhost:3001/products')
        // Handle both array and object with products property
        const productsData = Array.isArray(response.data) ? response.data : response.data.products
        setProducts(productsData || [])
      } catch (error) {
        console.error('Error fetching products:', error)
        
        // Handle different types of axios errors
        if (error.response) {
          // Server responded with error status
          setError(`Server error: ${error.response.status}`)
        } else if (error.request) {
          // Network error
          setError('Network error - please check your connection')
        } else {
          // Other error
          setError(error.message || 'An error occurred while fetching products')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const brands = useMemo(() => {
    return [...new Set(products.map(product => product.name))].sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedBrand) {
      filtered = filtered.filter(product => product.name === selectedBrand)
    }

    if (priceRange) {
      filtered = filtered.filter(product => {
        const price = product.salePrice || product.price
        switch (priceRange) {
          case 'under-8m':
            return price < 8000000
          case '8m-10m':
            return price >= 8000000 && price < 10000000
          case '10m-12m':
            return price >= 10000000 && price < 12000000
          case 'over-12m':
            return price >= 12000000
          default:
            return true
        }
      })
    }

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return a.title.localeCompare(b.title)
          case 'name-desc':
            return b.title.localeCompare(a.title)
          case 'price-asc':
            return (a.salePrice || a.price) - (b.salePrice || b.price)
          case 'price-desc':
            return (b.salePrice || b.price) - (a.salePrice || a.price)
          case 'brand-asc':
            return a.name.localeCompare(b.name)
          default:
            return 0
        }
      })
    }

    return filtered
  }, [products, searchTerm, selectedBrand, priceRange, sortBy])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedBrand('')
    setPriceRange('')
    setSortBy('')
  }

  const hasActiveFilters = searchTerm || selectedBrand || priceRange || sortBy

  if (loading) {
    return (
      <Container>
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading products...</p>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <div className="text-center py-5">
          <div className="alert alert-danger">
            <h4>Error Loading Products</h4>
            <p>{error}</p>
            <Button 
              variant="warning" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">Products</h2>
              <p className="text-muted mb-0">
                Found {filteredProducts.length} products
                {hasActiveFilters && (
                  <Button 
                    variant="link" 
                    className="p-0 ms-2 text-decoration-none"
                    onClick={clearFilters}
                  >
                    (Clear filters)
                  </Button>
                )}
              </p>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant={showFilters ? "warning" : "outline-warning"}
                onClick={() => setShowFilters(!showFilters)}
                className="d-lg-none"
              >
                <Filter size={16} />
              </Button>
              <div className="btn-group">
                <Button
                  variant={viewMode === 'grid' ? 'warning' : 'outline-secondary'}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'warning' : 'outline-secondary'}
                  onClick={() => setViewMode('list')}
                >
                  <List size={16} />
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={3} className={`mb-4 ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Header className="d-flex align-items-center">
              <SlidersHorizontal size={20} className="me-2" />
              <span className="fw-bold">Filters</span>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Search</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <Search size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by name, brand..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Brand</Form.Label>
                <Form.Select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">All brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Price Range</Form.Label>
                <Form.Select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">All prices</option>
                  <option value="under-8m">Under 8,000,000đ</option>
                  <option value="8m-10m">8,000,000đ - 10,000,000đ</option>
                  <option value="10m-12m">10,000,000đ - 12,000,000đ</option>
                  <option value="over-12m">Over 12,000,000đ</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="rounded-xl border-2 border-yellow-500 font-semibold p-2 transition hover:border-yellow-500 hover:bg-yellow-100 cursor-pointer">Sort by</Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="name-asc">Name A → Z</option>
                  <option value="name-desc">Name Z → A</option>
                  <option value="price-asc">Price Low → High</option>
                  <option value="price-desc">Price High → Low</option>
                  <option value="brand-asc">Brand A → Z</option>
                </Form.Select>
              </Form.Group>

              {hasActiveFilters && (
                <Button variant="outline-danger" onClick={clearFilters} className="w-100">
                  Clear all filters
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          {hasActiveFilters && (
            <div className="mb-4">
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <span className="text-muted">Active filters:</span>
                {searchTerm && (
                  <Badge bg="warning" className="d-flex align-items-center">
                    Search: "{searchTerm}"
                    <button
                      className="btn-close btn-close-white ms-2"
                      style={{ fontSize: '0.6em' }}
                      onClick={() => setSearchTerm('')}
                    ></button>
                  </Badge>
                )}
                {selectedBrand && (
                  <Badge bg="info" className="d-flex align-items-center">
                    Brand: {selectedBrand}
                    <button
                      className="btn-close btn-close-white ms-2"
                      style={{ fontSize: '0.6em' }}
                      onClick={() => setSelectedBrand('')}
                    ></button>
                  </Badge>
                )}
                {priceRange && (
                  <Badge bg="success" className="d-flex align-items-center">
                    Price: {
                      priceRange === 'under-8m' ? 'Under 8M' :
                      priceRange === '8m-10m' ? '8M - 10M' :
                      priceRange === '10m-12m' ? '10M - 12M' :
                      'Over 12M'
                    }
                    <button
                      className="btn-close btn-close-white ms-2"
                      style={{ fontSize: '0.6em' }}
                      onClick={() => setPriceRange('')}
                    ></button>
                  </Badge>
                )}
                {sortBy && (
                  <Badge bg="warning" className="d-flex align-items-center">
                    Sort: {
                      sortBy === 'name-asc' ? 'Name A→Z' :
                      sortBy === 'name-desc' ? 'Name Z→A' :
                      sortBy === 'price-asc' ? 'Price Low→High' :
                      sortBy === 'price-desc' ? 'Price High→Low' :
                      'Brand A→Z'
                    }
                    <button
                      className="btn-close btn-close-white ms-2"
                      style={{ fontSize: '0.6em' }}
                      onClick={() => setSortBy('')}
                    ></button>
                  </Badge>
                )}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-3">
                <Search size={64} className="text-muted" />
              </div>
              <h4>No products found</h4>
              <p className="text-muted">
                Try adjusting filters or search keywords
              </p>
              {hasActiveFilters && (
                <Button variant="warning" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <Row>
              {filteredProducts.map(product => (
                <Col
                  key={product.id}
                  lg={viewMode === 'grid' ? 4 : 12}
                  md={viewMode === 'grid' ? 6 : 12}
                  className="mb-4"
                >
                  <ProductCard product={product} viewMode={viewMode} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Products
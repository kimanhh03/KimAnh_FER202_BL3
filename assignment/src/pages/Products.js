import React, { useState, useEffect, useMemo } from 'react'
import { Container, Row, Col, Form, InputGroup, Button, Badge, Card } from 'react-bootstrap'
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
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
          case 'under-1m':
            return price < 1000000
          case '1m-2m':
            return price >= 1000000 && price < 2000000
          case '2m-3m':
            return price >= 2000000 && price < 3000000
          case 'over-3m':
            return price >= 3000000
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
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading products...</p>
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
                variant={showFilters ? "primary" : "outline-primary"}
                onClick={() => setShowFilters(!showFilters)}
                className="d-lg-none"
              >
                <Filter size={16} />
              </Button>
              <div className="btn-group">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-secondary'}
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
                  <option value="under-1m">Under 1,000,000đ</option>
                  <option value="1m-2m">1,000,000đ - 2,000,000đ</option>
                  <option value="2m-3m">2,000,000đ - 3,000,000đ</option>
                  <option value="over-3m">Over 3,000,000đ</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Sort by</Form.Label>
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
                  <Badge bg="primary" className="d-flex align-items-center">
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
                      priceRange === 'under-1m' ? 'Under 1M' :
                      priceRange === '1m-2m' ? '1M - 2M' :
                      priceRange === '2m-3m' ? '2M - 3M' :
                      'Over 3M'
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
                <Button variant="primary" onClick={clearFilters}>
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

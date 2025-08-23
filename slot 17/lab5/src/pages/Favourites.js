import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useFavourite } from '../context/FavouriteContext';
import { useTheme } from '../context/ThemeContext';
import ProductCard from '../components/ProductCard';

const Favourites = () => {
  const { favouriteItems, clearFavourites } = useFavourite();
  const { bgClass, cardClass } = useTheme();

  if (favouriteItems.length === 0) {
    return (
      <div className={`min-vh-100 ${bgClass}`}>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className={`text-center ${cardClass}`}>
                <Card.Body className="py-5">
                  <Heart size={64} className="text-muted mb-3" />
                  <h3 className="mb-3">No Favourites Yet</h3>
                  <p className="text-muted mb-4">
                    Start adding items to your favourites to see them here.
                  </p>
                  <Button 
                    as={Link} 
                    to="/products" 
                    variant="success" 
                    size="lg"
                  >
                    <ShoppingBag size={18} className="me-2" />
                    Browse Foods
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className={`min-vh-100 ${bgClass}`}>
      <Container className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="display-5 fw-bold mb-0">
                <Heart size={36} className="me-2 text-danger" />
                My Favourites ({favouriteItems.length} items)
              </h1>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={clearFavourites}
                disabled={favouriteItems.length === 0}
              >
                Clear All
              </Button>
            </div>
          </Col>
        </Row>

        {/* Favourites Grid */}
        <Row className="g-4">
          {favouriteItems.map(product => (
            <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
              <ProductCard product={product} inFavourites />
            </Col>
          ))}
        </Row>

        {/* Continue Shopping */}
        <Row className="mt-5">
          <Col className="text-center">
            <Button 
              as={Link} 
              to="/products" 
              variant="success" 
              size="lg"
            >
              <ShoppingBag size={18} className="me-2" />
              Continue Shopping
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Favourites;

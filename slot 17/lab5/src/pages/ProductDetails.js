import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavourite } from '../context/FavouriteContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import dishes from '../data/dishes';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavourites, isFavourite } = useFavourite();
  const { bgClass, cardClass } = useTheme();
  const { addToast } = useToast();

  const product = dishes.find(dish => dish.id === parseInt(id));

  if (!product) {
    return (
      <div className={`min-vh-100 ${bgClass}`}>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="text-center">
                <Card.Body>
                  <h3>Product Not Found</h3>
                  <p>The product you're looking for doesn't exist.</p>
                  <Button as={Link} to="/products" variant="primary">
                    Back to Products
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    addToast('Added to cart', 'success');
  };

  const handleToggleFavourite = () => {
    if (isFavourite(product.id)) {
      navigate('/favourites');
    } else {
      addToFavourites(product);
      addToast('Added to favourites', 'success');
    }
  };

  const handleBackToList = () => {
    navigate('/products');
  };

  const isProductFavourite = isFavourite(product.id);

  return (
    <div className={`min-vh-100 ${bgClass}`}>
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={handleBackToList}
              className="mb-3"
            >
              <ArrowLeft size={16} className="me-1" />
              Back to Products
            </Button>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={6}>
            <Card className={`${cardClass} border-0 shadow-sm`}>
              <div className="position-relative">
                <Card.Img 
                  variant="top" 
                  src={product.image} 
                  alt={product.name}
                  style={{ 
                    height: '400px', 
                    objectFit: 'cover',
                    width: '100%'
                  }}
                  onError={(e) => {
                    console.log('Image failed to load:', product.image);
                    e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                  }}
                />
                {isProductFavourite && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 end-0 m-3"
                  >
                    <Heart size={16} />
                  </Badge>
                )}
              </div>
            </Card>
          </Col>

          <Col lg={6}>
            <div className="h-100 d-flex flex-column">
              <h1 className="display-5 fw-bold mb-3">{product.name}</h1>
              
              <div className="mb-4">
                <span className="display-6 text-success fw-bold">
                  ${product.price}
                </span>
              </div>

              <div className="mb-4 flex-grow-1">
                <h5 className="mb-3">Description</h5>
                <p className="lead text-muted">
                  {product.description}
                </p>
                
                <div className="mt-4">
                  <h6 className="mb-2">Features:</h6>
                  <ul className="list-unstyled">
                    <li className="mb-1">✓ Made with fresh ingredients</li>
                    <li className="mb-1">✓ Authentic Indian recipe</li>
                    <li className="mb-1">✓ Ready in minutes</li>
                    <li className="mb-1">✓ Suitable for all ages</li>
                  </ul>
                </div>
              </div>

              <div className="d-grid gap-2">
                <Button 
                  variant="success" 
                  size="sm" 
                  onClick={handleAddToCart}
                  className="py-1"
                  style={{ fontSize: '14px' }}
                >
                  <ShoppingCart size={16} className="me-1" />
                  Add to Cart
                </Button>
                
                <div className="row g-1">
                  <div className="col-6">
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      onClick={handleBackToList}
                      className="w-100"
                      style={{ fontSize: '13px' }}
                    >
                      <ArrowLeft size={14} className="me-1" />
                      Back to List
                    </Button>
                  </div>
                  <div className="col-6">
                    <Button 
                      variant={isProductFavourite ? "success" : "outline-danger"} 
                      size="sm"
                      onClick={handleToggleFavourite}
                      className="w-100"
                      style={{ fontSize: '13px' }}
                    >
                      {isProductFavourite ? (
                        <>
                          <ArrowRight size={14} className="me-1" />
                          Favourites
                        </>
                      ) : (
                        <>
                          <Heart size={14} className="me-1" />
                          Add Favourite
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h3 className="mb-4">You might also like</h3>
            <div className="text-center">
              <Button as={Link} to="/products" variant="outline-success" size="sm" style={{ fontSize: '13px' }}>
                View All Products
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;

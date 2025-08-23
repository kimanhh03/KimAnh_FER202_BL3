import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, ShoppingCart, Heart, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavourite } from '../context/FavouriteContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product, inFavourites = false }) => {
  const { addToCart } = useCart();
  const { addToFavourites, removeFromFavourites, isFavourite } = useFavourite();
  const { cardClass, textClass } = useTheme();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    addToast('Added to cart', 'success');
  };

  const handleToggleFavourite = (e) => {
    e.preventDefault();
    if (isFavourite(product.id)) {
      navigate('/favourites');
    } else {
      addToFavourites(product);
      addToast('Added to favourites', 'success');
    }
  };

  const handleRemoveFavourite = (e) => {
    e.preventDefault();
    removeFromFavourites(product.id);
    addToast('Removed from favourites', 'success');
  };

  const isProductFavourite = isFavourite(product.id);

  return (
    <Card className={`h-100 shadow-sm ${cardClass}`} style={{ transition: 'transform 0.2s' }}>
      <div className="position-relative overflow-hidden">
        <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover', transition: 'transform 0.3s' }}
          className="card-img-hover"
        />
        {isProductFavourite && (
          <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
            <Heart size={14} />
          </Badge>
        )}
      </div>
      
      <Card.Body className={`d-flex flex-column ${textClass}`}>
        <Card.Title className={`h5 mb-2 ${textClass}`}>{product.name}</Card.Title>
        <Card.Text className={`mb-3 flex-grow-1 ${textClass}`}>
          {product.description}
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="h5 text-success mb-0 fw-bold">
            ${product.price}
          </span>
        </div>
        
        <div className="d-grid gap-2">
          {/* Row 1: View Details */}
          <Button 
            as={Link} 
            to={`/products/${product.id}`}
            variant="outline-success" 
            size="sm"
          >
            <Eye size={16} className="me-1" />
            View Details
          </Button>
          
          {/* Row 2: Add to Cart + Favourite/Remove */}
          <div className="row g-2">
            <div className="col">
              <Button 
                variant="success" 
                size="sm" 
                onClick={handleAddToCart}
                className="w-100"
              >
                <ShoppingCart size={16} className="me-1" />
                Add to Cart
              </Button>
            </div>
            <div className="col">
              {inFavourites ? (
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={handleRemoveFavourite}
                  className="w-100"
                >
                  <Trash2 size={16} className="me-1" />
                  Remove
                </Button>
              ) : (
                <Button 
                  variant={isProductFavourite ? "success" : "outline-danger"} 
                  size="sm"
                  onClick={handleToggleFavourite}
                  className="w-100"
                >
                  {isProductFavourite ? (
                    <>
                      <ArrowRight size={16} className="me-1" />
                      Browse
                    </>
                  ) : (
                    <>
                      <Heart size={16} className="me-1" />
                      Favourite
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card.Body>
      
      <style jsx>{`
        .card:hover {
          transform: translateY(-5px);
        }
        .card-img-hover:hover {
          transform: scale(1.05);
        }
      `}</style>
    </Card>
  );
};

export default ProductCard;

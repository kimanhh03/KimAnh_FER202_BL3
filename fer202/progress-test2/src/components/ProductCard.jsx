import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { FaEye, FaCartPlus, FaHeart } from 'react-icons/fa';

import { formatPrice } from '../utils/format';
import { assetUrl } from '../utils/format';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/products/${product.id}`);
    };

    const handleAddToCart = () => {
        // TODO: Implement add to cart logic
        console.log('Add to cart:', product);
        alert(`Added "${product.name}" to cart!`);
    };

    const handleToggleFavourite = () => {
        // TODO: Implement favourite toggle logic
        console.log('Toggle favourite:', product);
        alert(`Added "${product.name}" to favourites!`);
    };

    return (
        <Card className="h-100 shadow-sm product-card">
            <Card.Img
                variant="top"
                src={assetUrl(product.image) || `https://picsum.photos/seed/${product.id}/600/400`}
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={handleViewDetails}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="h6 mb-2" style={{ cursor: 'pointer' }} onClick={handleViewDetails}>
                    {product.name}
                </Card.Title>
                <Card.Text className="flex-grow-1 small text-muted mb-2">
                    {product.description}
                </Card.Text>

                <div className="mb-2">
                    <Badge bg="secondary" className="me-2 small">
                        {product.category}
                    </Badge>
                </div>

                <div className="mb-3">
                    <Badge bg="primary" className="fs-6">
                        {formatPrice(product.price)}
                    </Badge>
                </div>

                <ButtonGroup className="w-100">
                    <Button
                        variant="outline-primary"
                        size="sm"
                        className="flex-fill"
                        onClick={handleViewDetails}
                    >
                        <FaEye className="me-1" />
                        View Details
                    </Button>

                    <Button
                        variant="success"
                        size="sm"
                        className="flex-fill"
                        onClick={handleAddToCart}
                    >
                        <FaCartPlus className="me-1" />
                        Add to Cart
                    </Button>

                    <Button
                        variant="outline-danger"
                        size="sm"
                        className="flex-fill"
                        onClick={handleToggleFavourite}
                    >
                        <FaHeart className="me-1" />
                        Favourite
                    </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
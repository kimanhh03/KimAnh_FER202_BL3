import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaCartPlus, FaHeart, FaShare } from 'react-icons/fa';
import NavBarComponent from '../components/Navbar';
import { formatPrice } from '../utils/format';
import { assetUrl } from '../utils/format';
import api from '../services/api';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching product with ID:', id);
                const { data } = await api.get(`/products/${id}`);
                console.log('Product data received:', data);
                setProduct(data);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Product not found or failed to load.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        } else {
            console.log('No ID parameter found');
            setError('No product ID specified');
            setLoading(false);
        }
    }, [id]);

    const handleAddToCart = () => {
        // TODO: Implement add to cart logic
        alert(`Added "${product.name}" to cart!`);
    };

    const handleAddToFavourites = () => {
        // TODO: Implement add to favourites logic
        alert(`Added "${product.name}" to favourites!`);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href,
            });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert('Product link copied to clipboard!'))
                .catch(() => alert('Failed to share'));
        }
    };

    if (loading) {
        return (
            <>
                <NavBarComponent />
                <Container className="py-4 text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="mt-3">Loading product details...</p>
                </Container>
            </>
        );
    }

    if (error || !product) {
        return (
            <>
                <NavBarComponent />
                <Container className="py-4">
                    <Alert variant="danger">
                        <h4>Product Not Found</h4>
                        <p>{error || 'The requested product could not be found.'}</p>
                        <Button variant="outline-danger" onClick={() => navigate('/products')}>
                            <FaArrowLeft className="me-1" />
                            Back to Products
                        </Button>
                    </Alert>
                </Container>
            </>
        );
    }

    return (
        <>
            <NavBarComponent />
            <Container className="py-4">
                <Button 
                    variant="outline-secondary" 
                    className="mb-4"
                    onClick={() => navigate('/products')}
                >
                    <FaArrowLeft className="me-1" />
                    Back to Products
                </Button>

                <Row className="g-4">
                    <Col lg={6}>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={assetUrl(product.image) || `https://picsum.photos/seed/${product.id}/600/400`}
                                alt={product.name}
                                style={{ height: '400px', objectFit: 'cover' }}
                            />
                        </Card>
                    </Col>

                    <Col lg={6}>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <Card.Title as="h1" className="mb-0">
                                        {product.name}
                                    </Card.Title>
                                    <Button 
                                        variant="outline-secondary" 
                                        size="sm"
                                        onClick={handleShare}
                                    >
                                        <FaShare />
                                    </Button>
                                </div>

                                <div className="mb-3">
                                    <Badge bg="secondary" className="me-2">
                                        {product.category}
                                    </Badge>
                                </div>

                                <div className="mb-4">
                                    <h2 className="text-primary mb-3">
                                        {formatPrice(product.price)}
                                    </h2>
                                </div>

                                <Card.Text className="mb-4" style={{ fontSize: '1.1rem' }}>
                                    {product.description}
                                </Card.Text>

                                <div className="d-grid gap-2">
                                    <Button 
                                        variant="success" 
                                        size="sm"
                                        onClick={handleAddToCart}
                                    >
                                        <FaCartPlus className="me-2" />
                                        Add to Cart
                                    </Button>
                                    
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm"
                                        onClick={handleAddToFavourites}
                                    >
                                        <FaHeart className="me-2" />
                                        Add to Favourites
                                    </Button>
                                </div>

                                <hr className="my-4" />

                                <div>
                                    <h5>Product Information</h5>
                                    <ul className="list-unstyled">
                                        <li><strong>Product ID:</strong> #{product.id}</li>
                                        <li><strong>Category:</strong> {product.category}</li>
                                        <li><strong>Price:</strong> {formatPrice(product.price)}</li>
                                    </ul>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ProductDetail;
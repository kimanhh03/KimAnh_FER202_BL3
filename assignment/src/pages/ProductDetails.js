import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useToast } from "../contexts/ToastContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { isWished, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching product with ID:', id);
        
        const res = await fetch(`http://localhost:3001/products/${id}`);
        console.log('Response status:', res.status);
        
        if (!res.ok) {
          throw new Error("Product not found");
        }
        
        const data = await res.json();
        console.log('Product data:', data);
        setProduct(data);
        
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  const discount = product?.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      addToast("Added to cart!", "success");
    }
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      addToast("Please log in to manage wishlist", "info");
      return navigate("/login");
    }
    
    if (product) {
      toggleWishlist(product);
      addToast(
        isWished(product.id) ? "Removed from wishlist" : "Added to wishlist",
        "info"
      );
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" className="mb-3" />
          <p>Loading product details...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <Alert.Heading>❌ Error</Alert.Heading>
          <p>{error}</p>
          <p>Debug info: Product ID = {id}</p>
          <hr />
          <div className="d-flex gap-2">
            <Button variant="outline-danger" onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button variant="primary" onClick={() => navigate("/products")}>
              Back to Products
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-4">
        <Alert variant="warning">
          <Alert.Heading>Product Not Found</Alert.Heading>
          <p>The product you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => navigate("/products")}>
            Back to Products
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate("/products")} 
        className="d-flex align-items-center mb-4"
        style={{ borderRadius: "8px", padding: "8px 16px" }}
      >
        <ArrowLeft size={18} className="me-2" /> 
        Back to Products
      </Button>

      <Row>
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <div className="position-relative">
              <Card.Img
                src={product.image || `/placeholder.svg?height=500&width=500&text=${product.title}`}
                alt={product.title}
                style={{ height: "500px", objectFit: "cover" }}
              />
              <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-2">
                {product.tags?.includes("hot") && <Badge bg="danger" className="shadow-sm">HOT</Badge>}
                {discount > 0 && <Badge bg="success" className="shadow-sm">-{discount}%</Badge>}
              </div>
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <div className="ps-md-4">
            <h1 className="mb-3">{product.title}</h1>
            
            {product.salePrice ? (
              <div className="mb-3">
                <span className="text-muted text-decoration-line-through me-3 fs-5">
                  {formatPrice(product.price)}
                </span>
                <span className="text-danger fs-2 fw-bold">{formatPrice(product.salePrice)}</span>
              </div>
            ) : (
              <div className="mb-3">
                <span className="fs-2 fw-bold text-primary">{formatPrice(product.price)}</span>
              </div>
            )}

            <p className="text-muted fs-6 mb-4" style={{ lineHeight: "1.6" }}>
              {product.description || "No description available."}
            </p>

            <Row className="g-3 mb-4">
              <Col sm={8}>
                <Button 
                  variant="warning" 
                  size="lg" 
                  className="w-100 fw-semibold" 
                  onClick={handleAddToCart}
                  style={{ borderRadius: "8px", padding: "12px" }}
                >
                  <ShoppingCart size={20} className="me-2" /> 
                  Add to Cart
                </Button>
              </Col>
              <Col sm={4}>
                <Button
                  variant={isAuthenticated && isWished(product.id) ? "danger" : "outline-danger"}
                  size="lg"
                  className="w-100"
                  onClick={handleWishlist}
                  style={{ borderRadius: "8px", padding: "12px" }}
                >
                  <Heart
                    size={20}
                    fill={isAuthenticated && isWished(product.id) ? "currentColor" : "none"}
                  />
                </Button>
              </Col>
            </Row>

            <Card className="bg-light border-0">
              <Card.Body>
                <div className="mb-2">
                  <strong>Brand:</strong> <span className="text-muted">{product.name}</span>
                </div>
                <div className="mb-2">
                  <strong>SKU:</strong> <span className="text-muted">#{product.id}</span>
                </div>
                <div>
                  <Badge bg="success" className="px-3 py-2">
                    ✓ In Stock
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
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
        const res = await fetch(`http://localhost:3001/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  const discount = product?.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product);
    addToast("Added to cart!", "success");
  };

  const handleWishlist = () => {
    if (!isAuthenticated) return navigate("/login");
    toggleWishlist(product);
    addToast(
      isWished(product.id) ? "Removed from wishlist" : "Added to wishlist",
      "info"
    );
  };

  if (loading) return <Spinner animation="border" className="d-block m-auto my-5" />;
  if (error) return <Alert variant="danger">❌ {error}</Alert>;
  if (!product) return <Alert variant="warning">Product not found</Alert>;

  return (
    <Container className="py-4">
      <Button variant="link" onClick={() => navigate("/products")} className="mb-3">
        <ArrowLeft size={16} className="me-1" /> Back to Products
      </Button>

      <Row>
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Img
              src={product.image || `/placeholder.svg?height=500&width=500&text=${product.title}`}
              alt={product.title}
              style={{ height: "500px", objectFit: "cover" }}
            />
            <div className="position-absolute top-0 start-0 m-3">
              {product.tags?.includes("hot") && <Badge bg="danger">HOT</Badge>}
              {discount > 0 && <Badge bg="success">-{discount}%</Badge>}
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <h1>{product.title}</h1>
          {product.salePrice ? (
            <div>
              <span className="text-muted text-decoration-line-through me-2">
                {formatPrice(product.price)}
              </span>
              <span className="text-danger fs-3 fw-bold">{formatPrice(product.salePrice)}</span>
            </div>
          ) : (
            <span className="fs-3 fw-bold text-primary">{formatPrice(product.price)}</span>
          )}

          <p className="mt-3 text-muted">{product.description || "No description available."}</p>

          <Row className="g-2 mt-4">
            <Col sm={8}>
              <Button variant="warning" size="lg" className="w-100" onClick={handleAddToCart}>
                <ShoppingCart size={20} className="me-2" /> Add to Cart
              </Button>
            </Col>
            <Col sm={4}>
              <Button
                variant={isAuthenticated && isWished(product.id) ? "danger" : "outline-danger"}
                size="lg"
                className="w-100"
                onClick={handleWishlist}
              >
                <Heart
                  size={20}
                  fill={isAuthenticated && isWished(product.id) ? "currentColor" : "none"}
                />
              </Button>
            </Col>
          </Row>

          <div className="mt-4">
            <p><strong>Brand:</strong> {product.name}</p>
            <p><strong>SKU:</strong> #{product.id}</p>
            <Badge bg="success">In Stock</Badge>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;

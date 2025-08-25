import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Heart, ShoppingCart, Eye, Trash2 } from "lucide-react";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const handleAddToCart = (product) => {
    addToCart(product);
    addToast("Added to cart!", "success");
  };

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
    addToast("Removed from wishlist", "info");
  };

  if (items.length === 0) {
    return (
      <Container>
        <div className="text-center py-5">
          <Heart size={64} className="text-secondary mb-3" />
          <h3>Your wishlist is empty</h3>
          <p className="text-muted">Start adding some products you love</p>
          <LinkContainer to="/products">
            <Button variant="primary">Browse Products</Button>
          </LinkContainer>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4">My Wishlist</h2>
      <Row>
        {items.map((product) => (
          <Col lg={4} md={6} sm={12} key={product.id} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={
                  product.image ||
                  `/placeholder.svg?height=250&width=300&query=${product.title}`
                }
                style={{ height: "250px", objectFit: "cover" }}
                alt={product.title}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="h6">{product.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {product.name}
                </Card.Subtitle>

                <div className="mb-3">
                  {product.salePrice ? (
                    <>
                      <span className="text-decoration-line-through text-muted me-2">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-danger fw-bold">
                        {formatPrice(product.salePrice)}
                      </span>
                    </>
                  ) : (
                    <span className="fw-bold">{formatPrice(product.price)}</span>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart size={16} className="me-2" />
                      Add to Cart
                    </Button>

                    <div className="d-flex gap-2">
                      <LinkContainer
                        to={`/product/${product.id}`}
                        className="flex-fill"
                      >
                        <Button variant="outline-secondary">
                          <Eye size={16} className="me-2" />
                          View
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="outline-danger"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Wishlist;

import { Card, Button, Badge, Row, Col } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { ShoppingCart, Heart, Eye, Star } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import { useToast } from "../contexts/ToastContext"
import { useNavigate, useLocation } from "react-router-dom"
import { useCallback } from "react"

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { isAuthenticated, setRedirect } = useAuth()
  const { addToCart } = useCart()
  const { isWished, toggleWishlist } = useWishlist()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const handleAddToCart = useCallback(() => {
    addToCart(product)
    addToast("Added to cart!", "success")
  }, [addToCart, product, addToast])

  const handleWishlistClick = useCallback(() => {
    if (!isAuthenticated) {
      setRedirect(location.pathname)
      addToast("Please log in to add to wishlist", "info")
      navigate("/login")
      return
    }
    toggleWishlist(product)
    if (isWished(product.id)) {
      addToast("Removed from wishlist", "info")
    } else {
      addToast("Added to wishlist!", "success")
    }
  }, [isAuthenticated, setRedirect, location.pathname, addToast, navigate, toggleWishlist, product, isWished])

  const handleViewWishlist = useCallback(() => {
    navigate("/wishlist")
  }, [navigate])

  const discountPercentage = product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0

  if (viewMode === 'grid') {
    return (
      <Card className="mb-4 h-100 shadow-sm border-0 product-card">
        <div className="position-relative overflow-hidden">
          <Card.Img
            variant="top"
            src={product.image || `/placeholder.svg?height=250&width=300&query=${product.title}`}
            style={{ height: "280px", objectFit: "cover", transition: "transform 0.3s ease" }}
            alt={product.title}
            className="product-image"
          />
          <div className="position-absolute top-0 start-0 m-2">
            {product.tags.includes("hot") && (
              <Badge bg="danger" className="me-1 mb-1">HOT</Badge>
            )}
            {product.tags.includes("sale") && discountPercentage > 0 && (
              <Badge bg="warning" className="mb-1">-{discountPercentage}%</Badge>
            )}
          </div>
          <div className="position-absolute top-0 end-0 m-2">
            {isAuthenticated && isWished(product.id) ? (
              <Button
                variant="light"
                size="sm"
                className="rounded-circle p-2 shadow-sm"
                onClick={handleViewWishlist}
              >
                <Heart size={16} fill="red" color="red" />
              </Button>
            ) : (
              <Button
                variant="light"
                size="sm"
                className="rounded-circle p-2 shadow-sm"
                onClick={handleWishlistClick}
              >
                <Heart size={16} />
              </Button>
            )}
          </div>
          <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-dark product-overlay">
            <LinkContainer to={`/product/${product.id}`}>
              <Button variant="light" size="sm" className="w-100 opacity-90">
                <Eye size={16} className="me-2" /> View details
              </Button>
            </LinkContainer>
          </div>
        </div>
        <Card.Body className="d-flex flex-column p-3">
          <div className="mb-2">
            <Badge bg="outline-secondary" className="mb-2 text-dark border">
              {product.name}
            </Badge>
          </div>
          <Card.Title className="h6 mb-2 text-truncate" title={product.title}>
            {product.title}
          </Card.Title>
          <div className="mb-3 mt-auto">
            {product.salePrice ? (
              <div className="d-flex align-items-center flex-wrap">
                <span className="text-decoration-line-through text-muted me-2 small">
                  {formatPrice(product.price)}
                </span>
                <span className="text-danger fw-bold fs-6">
                  {formatPrice(product.salePrice)}
                </span>
              </div>
            ) : (
              <span className="fw-bold text-primary fs-6">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <div className="d-grid">
            <Button variant="warning" onClick={handleAddToCart} className="fw-semibold">
              <ShoppingCart size={16} className="me-2" /> Add to Cart
            </Button>
          </div>
        </Card.Body>
        <style jsx>{`
          .product-card:hover .product-image {
            transform: scale(1.05);
          }
          .product-overlay {
            background: linear-gradient(transparent, rgba(0,0,0,0.7));
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .product-card:hover .product-overlay {
            opacity: 1;
          }
          .bg-gradient-dark {
            background: linear-gradient(transparent, rgba(0,0,0,0.8)) !important;
          }
        `}</style>
      </Card>
    )
  }

  return (
    <Card className="mb-3 shadow-sm border-0">
      <Row className="g-0 align-items-center">
        <Col md={3}>
          <div className="position-relative">
            <Card.Img
              src={product.image || `/placeholder.svg?height=200&width=250&query=${product.title}`}
              style={{ height: "200px", objectFit: "cover" }}
              alt={product.title}
              className="rounded-start"
            />
            <div className="position-absolute top-0 start-0 m-2">
              {product.tags.includes("hot") && (
                <Badge bg="danger" className="me-1 mb-1">HOT</Badge>
              )}
              {product.tags.includes("sale") && discountPercentage > 0 && (
                <Badge bg="success" className="mb-1">-{discountPercentage}%</Badge>
              )}
            </div>
          </div>
        </Col>
        <Col md={6}>
          <Card.Body>
            <div className="d-flex align-items-center mb-2">
              <Badge bg="outline-secondary" className="me-2 text-dark border">
                {product.name}
              </Badge>
              <div className="text-warning">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} size={14} fill="#ffc107" color="#ffc107" />
                ))}
                <small className="text-muted ms-1">(4.5)</small>
              </div>
            </div>
            <Card.Title className="h5 mb-2">{product.title}</Card.Title>
            <Card.Text className="text-muted mb-3">
              {product.description || "Premium handbag with elegant design and excellent quality, suitable for all occasions."}
            </Card.Text>
            <div className="mb-3">
              {product.salePrice ? (
                <div className="d-flex align-items-center">
                  <span className="text-decoration-line-through text-muted me-3">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-danger fw-bold fs-4">
                    {formatPrice(product.salePrice)}
                  </span>
                  <Badge bg="success" className="ms-2">
                    Save {formatPrice(product.price - product.salePrice)}
                  </Badge>
                </div>
              ) : (
                <span className="fw-bold text-primary fs-4">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </Card.Body>
        </Col>
        <Col md={3}>
          <Card.Body className="text-center">
            <div className="d-grid gap-2">
              <Button variant="warning" size="lg" onClick={handleAddToCart} className="fw-semibold">
                <ShoppingCart size={18} className="me-2" /> Add to Cart
              </Button>
              <div className="d-flex gap-2">
                <LinkContainer to={`/product/${product.id}`} className="flex-fill">
                  <Button variant="outline-secondary">
                    <Eye size={16} className="me-1" /> Details
                  </Button>
                </LinkContainer>
                {isAuthenticated && isWished(product.id) ? (
                  <Button variant="outline-danger" onClick={handleViewWishlist}>
                    <Heart size={16} fill="currentColor" />
                  </Button>
                ) : (
                  <Button variant="outline-danger" onClick={handleWishlistClick}>
                    <Heart size={16} />
                  </Button>
                )}
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default ProductCard

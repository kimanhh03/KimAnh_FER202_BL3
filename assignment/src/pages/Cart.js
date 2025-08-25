import { Container, Row, Col, Card, Table, Button, Image } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCart } from "../contexts/CartContext"

const Cart = () => {
  const { items, subtotal, removeFromCart, incrementQty, decrementQty } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  if (items.length === 0) {
    return (
      <Container>
        <div className="text-center py-5">
          <ShoppingBag size={64} className="text-secondary mb-3" />
          <h3>Your cart is empty</h3>
          <p className="text-muted">Please add some products to your cart</p>
          <LinkContainer to="/">
            <Button variant="primary">Continue Shopping</Button>
          </LinkContainer>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <h2 className="mb-4">Your Cart</h2>

      <Row>
        <Col lg={8}>
          <Card>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const price = item.salePrice || item.price
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <Image
                              src={item.image || `/placeholder.svg?height=80&width=80&query=${item.title}`}
                              alt={item.title}
                              width={80}
                              height={80}
                              className="me-3 rounded"
                              style={{ objectFit: "cover" }}
                            />
                            <div>
                              <h6 className="mb-1">{item.title}</h6>
                              <small className="text-muted">{item.name}</small>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">{formatPrice(price)}</td>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <Button variant="outline-secondary" size="sm" onClick={() => decrementQty(item.id)}>
                              <Minus size={14} />
                            </Button>
                            <span className="mx-3">{item.qty}</span>
                            <Button variant="outline-secondary" size="sm" onClick={() => incrementQty(item.id)}>
                              <Plus size={14} />
                            </Button>
                          </div>
                        </td>
                        <td className="align-middle">
                          <strong>{formatPrice(price * item.qty)}</strong>
                        </td>
                        <td className="align-middle">
                          <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
                            <Trash2 size={16} />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">{formatPrice(subtotal)}</strong>
              </div>

              <div className="d-grid gap-2">
                <LinkContainer to="/checkout">
                  <Button variant="warning" size="lg" className="fw-semibold">
                    Checkout
                  </Button>
                </LinkContainer>
                <LinkContainer to="/products">
                  <Button variant="outline-secondary">Continue Shopping</Button>
                </LinkContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Cart

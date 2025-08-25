import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { useToast } from "../contexts/ToastContext"

const Checkout = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { items, subtotal, clearCart } = useCart()
  const { addToast } = useToast()

  const [orderData, setOrderData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "cod",
  })
  const [loading, setLoading] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const handleInputChange = (field, value) => {
    setOrderData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      addToast("Please log in to place an order", "warning")
      navigate("/login")
      return
    }

    if (items.length === 0) {
      addToast("Your cart is empty", "warning")
      navigate("/cart")
      return
    }

    setLoading(true)

    try {
      const order = {
        id: Date.now(),
        userId: user.id,
        items: items,
        total: subtotal,
        date: new Date().toISOString(),
        customerInfo: orderData,
        status: "pending",
      }

      console.log("Order created:", order)

      clearCart()
      addToast("Order placed successfully! Thank you for your purchase.", "success")
      navigate("/")
    } catch (error) {
      addToast("An error occurred while placing the order", "danger")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <Container>
        <div className="text-center py-5">
          <h3>Please log in to proceed with checkout</h3>
          <Button variant="warning" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </Container>
    )
  }

  if (items.length === 0) {
    return (
      <Container>
        <div className="text-center py-5">
          <h3>Your cart is empty</h3>
          <Button variant="warning" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <h2 className="mb-4">Checkout</h2>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Shipping Information</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        value={orderData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        value={orderData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number *</Form.Label>
                      <Form.Control
                        type="tel"
                        value={orderData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City *</Form.Label>
                      <Form.Control
                        type="text"
                        value={orderData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Shipping Address *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={orderData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    value={orderData.paymentMethod}
                    onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                  >
                    <option value="cod">Cash on Delivery (COD)</option>
                    <option value="bank">Bank Transfer</option>
                  </Form.Select>
                </Form.Group>

                <Button
                  type="submit"
                  variant="warning"
                  size="lg"
                  disabled={loading}
                  className="w-100 fw-semibold"
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Your Order</h5>
            </Card.Header>
            <Card.Body>
              <Table size="sm">
                <tbody>
                  {items.map((item) => {
                    const price = item.salePrice || item.price
                    return (
                      <tr key={item.id}>
                        <td>
                          <small>{item.title}</small>
                          <br />
                          <small className="text-muted">x{item.qty}</small>
                        </td>
                        <td className="text-end">
                          <small>{formatPrice(price * item.qty)}</small>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong className="text-primary">{formatPrice(subtotal)}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Checkout

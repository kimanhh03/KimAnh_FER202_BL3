import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { Button, Alert, Card, ListGroup, Badge } from "react-bootstrap";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue } =
    useContext(CartContext);

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleCheckout = () => {
    setOrderConfirmed(true);
    clearCart();
  };

  return (
    <div className="my-4">
      <Card className="shadow-sm">
        <Card.Header className="fw-bold d-flex align-items-center">
          🛒 Your Cart
          <Badge bg="secondary" className="ms-2">
            {cartItems.length}
          </Badge>
        </Card.Header>

        <Card.Body>
          {cartItems.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            <>
              <ListGroup variant="flush" className="mb-3">
                {cartItems.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.name}</strong> - ${item.price}
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="d-flex justify-content-between mb-3">
                <span>Total Items:</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Total Price:</span>
                <strong>${totalValue}</strong>
              </div>

              <div className="d-flex justify-content-end">
                <Button
                  variant="outline-warning"
                  onClick={clearCart}
                  className="me-2"
                >
                  Clear Cart
                </Button>
                <Button variant="success" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            </>
          )}

          {orderConfirmed && (
            <Alert variant="success" className="mt-3">
              🎉 Payment successful! Thank you for your order.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cart;

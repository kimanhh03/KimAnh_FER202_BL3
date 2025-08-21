import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";
import { Card, Button, Form } from "react-bootstrap";

const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h3>Dish List</h3>

      <Form.Control
        type="text"
        placeholder="Search for a dish..."
        className="my-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="row">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="col-md-4 mb-3 d-flex">
            <Card className="h-100 w-100 shadow-sm">
              {/* Fixed image frame */}
              <div style={{ height: "200px", overflow: "hidden" }}>
                <Card.Img
                  variant="top"
                  src={dish.image}
                  alt={dish.name}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>{dish.description}</Card.Text>
                <Card.Text>Price: ${parseFloat(dish.price).toFixed(2)}</Card.Text>

                <Button
                  variant="success"
                  onClick={() => addToCart(dish)}
                  className="mt-auto"
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

// Prop validation
DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;

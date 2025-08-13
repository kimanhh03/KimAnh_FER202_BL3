import React, { useState } from 'react';

const RecipeModal = ({ recipe, show, onClose, onAddToCart, cartItems }) => {
  const [quantity, setQuantity] = useState(1);

  if (!show || !recipe) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(recipe);
    }
    setQuantity(1); 
  };

  const isInCart = cartItems.some(item => item.id === recipe.id);
  const cartItem = cartItems.find(item => item.id === recipe.id);

  return (
    <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{recipe.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <img src={recipe.image} className="img-fluid mb-3 rounded" alt={recipe.title} />
            <p className="mb-3">{recipe.description}</p>
            <div className="row mb-3">
              <div className="col-md-4">
                <strong>Servings:</strong> {recipe.servings}
              </div>
              <div className="col-md-4">
                <strong>Prep:</strong> {recipe.prepTime}
              </div>
              <div className="col-md-4">
                <strong>Cook:</strong> {recipe.cookTime}
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="me-2"><strong>Quantity:</strong></label>
                  <div className="d-flex align-items-center">
                    <button 
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span className="mx-3 fw-bold">{quantity}</span>
                    <button 
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              {isInCart && (
                <div className="col-md-6">
                  <div className="alert alert-info py-2 mb-0">
                    <small>Already in cart: {cartItem.quantity} items</small>
                  </div>
                </div>
              )}
            </div>

            <h6>Ingredients:</h6>
            <ul>
              {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h6>Instructions:</h6>
            <ol>
              {recipe.instructions && recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
          <div className="modal-footer">
            <button 
              className="btn btn-success me-2" 
              onClick={handleAddToCart}
            >
              Add {quantity} to Cart
            </button>
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
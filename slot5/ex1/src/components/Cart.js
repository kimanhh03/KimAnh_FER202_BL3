import React, { useState } from 'react';

const Cart = ({ cartItems }) => {
  const [showCart, setShowCart] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="dropdown">
      <button 
        className="btn btn-outline-primary position-relative"
        onClick={() => setShowCart(!showCart)}
      >
        🛒 Cart
        {totalItems > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {totalItems}
          </span>
        )}
      </button>
      
      {showCart && (
        <div className="dropdown-menu dropdown-menu-end show" style={{width: '300px', maxHeight: '400px', overflowY: 'auto'}}>
          <div className="dropdown-header">
            <h6 className="mb-0">Shopping Cart</h6>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="dropdown-item-text text-center py-3">
              Your cart is empty
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="dropdown-item-text border-bottom">
                  <div className="d-flex align-items-center py-2">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="rounded me-3"
                      style={{width: '50px', height: '50px', objectFit: 'cover'}}
                    />
                    <div className="flex-grow-1">
                      <div className="fw-bold mb-1" style={{fontSize: '0.9rem'}}>
                        {item.title}
                      </div>
                      <small className="text-muted">
                        Quantity: {item.quantity}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="dropdown-item-text text-center py-3">
                <button className="btn btn-success w-100">
                  Checkout ({totalItems} items)
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
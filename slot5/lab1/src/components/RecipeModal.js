import React from 'react';

const RecipeModal = ({ recipe, show, onHide }) => {
  if (!show || !recipe) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">{recipe.name}</h5>
            <button type="button" className="btn-close" onClick={onHide} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <img 
              src={recipe.image} 
              className="img-fluid mb-3 rounded" 
              alt={recipe.name} 
              style={{width: '100%', maxHeight: '300px', objectFit: 'cover'}}
            />
            <p className="mb-3 text-muted">{recipe.description}</p>
            
            <div className="row mb-4">
              <div className="col-md-3 col-6">
                <div className="text-center p-2 bg-light rounded">
                  <div className="fw-bold text-primary">👥 {recipe.servings}</div>
                  <small className="text-muted">Servings</small>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="text-center p-2 bg-light rounded">
                  <div className="fw-bold text-success">⏱️ {recipe.prepTime} min</div>
                  <small className="text-muted">Prep Time</small>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="text-center p-2 bg-light rounded">
                  <div className="fw-bold text-warning">🔥 {recipe.cookTime} min</div>
                  <small className="text-muted">Cook Time</small>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="text-center p-2 bg-light rounded">
                  <div className="fw-bold text-info">📊 {recipe.difficulty}</div>
                  <small className="text-muted">Difficulty</small>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">🛒 Ingredients:</h6>
                <ul className="list-unstyled">
                  {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="mb-2 d-flex align-items-start">
                      <span className="badge bg-primary rounded-pill me-2 mt-1" style={{minWidth: '20px', fontSize: '0.7rem'}}>
                        {index + 1}
                      </span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">👩‍🍳 Instructions:</h6>
                <ol className="list-unstyled">
                  {recipe.instructions && recipe.instructions.map((instruction, index) => (
                    <li key={index} className="mb-3 d-flex align-items-start">
                      <span className="badge bg-success rounded-circle me-3 mt-1 d-flex align-items-center justify-content-center" 
                            style={{width: '25px', height: '25px', fontSize: '0.8rem'}}>
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="modal-footer bg-light">
            <button className="btn btn-secondary" onClick={onHide}>
              Close
            </button>
            <button className="btn btn-success">
              🍴 Start Cooking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
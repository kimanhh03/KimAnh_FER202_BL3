import React from 'react';

const RecipeCard = ({ recipe, onViewRecipe }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={recipe.image} 
        className="card-img-top" 
        alt={recipe.title}
        style={{height: '180px', objectFit: 'cover'}} 
      />
      <div className="card-body d-flex flex-column p-3">
        <h6 className="card-title mb-2">{recipe.title}</h6>
        <p className="card-text text-muted flex-grow-1 mb-2" style={{fontSize: '0.85rem'}}>
          {recipe.description}
        </p>
        <div className="mb-2">
          <div className="row">
            <div className="col-4">
              <small className="text-muted" style={{fontSize: '0.75rem'}}>
                {recipe.servings} servings
              </small>
            </div>
            <div className="col-4">
              <small className="text-muted" style={{fontSize: '0.75rem'}}>
                {recipe.prepTime}
              </small>
            </div>
            <div className="col-4">
              <small className="text-muted" style={{fontSize: '0.75rem'}}>
                {recipe.cookTime}
              </small>
            </div>
          </div>
        </div>
        <button 
          className="btn btn-success btn-sm w-100"
          onClick={() => onViewRecipe(recipe)}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
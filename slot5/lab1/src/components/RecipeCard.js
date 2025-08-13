import React from 'react';

const RecipeCard = ({ recipe, onViewRecipe, onAddToFavourite, isFavourite }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={recipe.image}
          className="card-img-top"
          alt={recipe.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{recipe.name}</h5>
          <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
            {recipe.description}
          </p>
          <div className="mb-3">
            <small className="text-muted d-block">
              👥 {recipe.servings} servings | ⏱️ {recipe.prepTime + recipe.cookTime} min total
            </small>
            <small className="text-muted">
              📊 {recipe.difficulty}
            </small>
          </div>
          <div className="d-flex gap-2 mt-auto">
            <button
              className="btn flex-fill"
              style={{
                backgroundColor: '#2e7d32',
                color: 'white',
                border: 'none'
              }}
              onClick={() => onViewRecipe(recipe)}
            >
              View Recipe
            </button>
            <button
              className={`btn ${isFavourite ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => onAddToFavourite(recipe)}
              title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
            >
              {isFavourite ? '❤️' : '♡'} {!isFavourite && 'Add to Favourite'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

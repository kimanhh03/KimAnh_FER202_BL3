import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes, onViewRecipe, onAddToFavourite, favourites }) => {
  if (recipes.length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="text-muted">
              <h4>No recipes found</h4>
              <p>Try adjusting your search terms or filters.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onViewRecipe={onViewRecipe}
            onAddToFavourite={onAddToFavourite}
            isFavourite={favourites.some(fav => fav.id === recipe.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
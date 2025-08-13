import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes, onViewRecipe }) => {
  return (
    <div className="container my-3">
      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <RecipeCard recipe={recipe} onViewRecipe={onViewRecipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
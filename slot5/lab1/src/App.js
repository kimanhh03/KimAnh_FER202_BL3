import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedCarousel from './components/FeaturedCarousel';
import SearchFilters from './components/SearchFilters';
import RecipeGrid from './components/RecipeGrid';
import RecipeModal from './components/RecipeModal';
import RecipeRequestForm from './components/RecipeRequestForm';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { recipeData } from './data/recipeData';

function App() {
  const [recipes] = useState(recipeData);
  const [filteredRecipes, setFilteredRecipes] = useState(recipeData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("name-asc");

  useEffect(() => {
    const filtered = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm.toLowerCase())),
    );

    switch (sortBy) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "prep-asc":
        filtered.sort((a, b) => a.prepTime - b.prepTime);
        break;
      case "prep-desc":
        filtered.sort((a, b) => b.prepTime - a.prepTime);
        break;
      case "cook-asc":
        filtered.sort((a, b) => a.cookTime - b.cookTime);
        break;
      case "cook-desc":
        filtered.sort((a, b) => b.cookTime - a.cookTime);
        break;
      default:
        break;
    }

    setFilteredRecipes(filtered);
    setCurrentPage(1);
  }, [searchTerm, recipes, sortBy]);

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleAddToFavourites = (recipe) => {
    if (!favourites.find((fav) => fav.id === recipe.id)) {
      setFavourites([...favourites, recipe]);
      setToast({ show: true, message: "Added to favourites!" });
      setTimeout(() => setToast({ show: false, message: "" }), 5000);
    } else {
      setFavourites(favourites.filter(fav => fav.id !== recipe.id));
      setToast({ show: true, message: "Removed from favourites!" });
      setTimeout(() => setToast({ show: false, message: "" }), 5000);
    }
  };

  const handleShowRequestForm = () => {
    setShowRequestForm(true);
  };

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="App">
      <Header onShowRequestForm={handleShowRequestForm} />
      <HeroSection />
      <FeaturedCarousel 
        recipes={recipeData.slice(0, 6)} 
        onViewRecipe={handleViewRecipe}
        onAddToFavourite={handleAddToFavourites}
      />

      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        totalItems={filteredRecipes.length}
      />

      <RecipeGrid
        recipes={currentRecipes}
        onViewRecipe={handleViewRecipe}
        onAddToFavourite={handleAddToFavourites}
        favourites={favourites}
      />

      <Footer />

      {showModal && (
        <RecipeModal 
          recipe={selectedRecipe} 
          show={showModal} 
          onHide={() => setShowModal(false)} 
        />
      )}

      {showRequestForm && (
        <RecipeRequestForm 
          onClose={() => setShowRequestForm(false)} 
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}

export default App;
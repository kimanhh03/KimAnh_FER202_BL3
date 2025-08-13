import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SearchFilters from './components/SearchFilters';
import RecipeGrid from './components/RecipeGrid';
import RecipeModal from './components/RecipeModal';
import Footer from './components/Footer';
import { sampleRecipes } from './data/recipeData';

const App = () => {
  const [recipes] = useState(sampleRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState(sampleRecipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [prepTimeFilter, setPrepTimeFilter] = useState('');
  const [cookTimeFilter, setCookTimeFilter] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let filtered = recipes;

    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (prepTimeFilter) {
      filtered = filtered.filter(recipe => recipe.prepTime === prepTimeFilter);
    }

    if (cookTimeFilter) {
      filtered = filtered.filter(recipe => recipe.cookTime === cookTimeFilter);
    }

    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, prepTimeFilter, cookTimeFilter]);

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const addToCart = (recipe) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === recipe.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === recipe.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...recipe, quantity: 1 }];
      }
    });
    
    alert(`${recipe.title} add successfully!`);
  };

  const removeFromCart = (recipeId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== recipeId));
  };

  const updateQuantity = (recipeId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(recipeId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === recipeId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <HeroSection />
      <SearchFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        prepTimeFilter={prepTimeFilter}
        setPrepTimeFilter={setPrepTimeFilter}
        cookTimeFilter={cookTimeFilter}
        setCookTimeFilter={setCookTimeFilter}
      />
      <RecipeGrid recipes={filteredRecipes} onViewRecipe={handleViewRecipe} />
      <RecipeModal 
        recipe={selectedRecipe}
        show={showModal}
        onClose={handleCloseModal}
        onAddToCart={addToCart}
        cartItems={cartItems}
      />
      <Footer />
    </div>
  );
};

export default App;
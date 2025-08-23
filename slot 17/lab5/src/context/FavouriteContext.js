  import React, { createContext, useContext, useReducer } from "react";

  const FavouriteContext = createContext();

  const favouriteReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_FAVOURITES":
        if (state.find(item => item.id === action.payload.id)) {
          return state;
        }
        return [...state, action.payload];
      
      case "REMOVE_FROM_FAVOURITES":
        return state.filter(item => item.id !== action.payload);
      
      case "CLEAR_FAVOURITES":
        return [];
      
      default:
        return state;
    }
  };

  export const useFavourite = () => {
    const context = useContext(FavouriteContext);
    if (!context) {
      throw new Error("useFavourite must be used within a FavouriteProvider");
    }
    return context;
  };

  export const FavouriteProvider = ({ children }) => {
    const [favouriteItems, dispatch] = useReducer(favouriteReducer, []);

    const addToFavourites = (product) => {
      dispatch({ type: "ADD_TO_FAVOURITES", payload: product });
    };

    const removeFromFavourites = (productId) => {
      dispatch({ type: "REMOVE_FROM_FAVOURITES", payload: productId });
    };

    const clearFavourites = () => {
      dispatch({ type: "CLEAR_FAVOURITES" });
    };

    const isFavourite = (productId) => {
      return favouriteItems.some(item => item.id === productId);
    };

    return (
      <FavouriteContext.Provider value={{
        favouriteItems,
        addToFavourites,
        removeFromFavourites,
        clearFavourites,
        isFavourite,
        totalFavourites: favouriteItems.length
      }}>
        {children}
      </FavouriteContext.Provider>
    );
  };
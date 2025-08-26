import { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react"

const WishlistContext = createContext()

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        items: [...state.items, action.payload],
      }

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case "LOAD_WISHLIST":
      return {
        ...state,
        items: action.payload,
      }

    default:
      return state
  }
}

const initialState = {
  items: [],
}

const saveWishlistToLocalStorage = (items) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify(items))
  } catch (error) {
    console.error("Error saving wishlist to localStorage:", error)
  }
}

const loadWishlistFromLocalStorage = () => {
  try {
    const savedWishlist = localStorage.getItem("wishlist")
    return savedWishlist ? JSON.parse(savedWishlist) : []
  } catch (error) {
    console.error("Error loading wishlist from localStorage:", error)
    return []
  }
}

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)

  useEffect(() => {
    const savedItems = loadWishlistFromLocalStorage()
    if (savedItems.length > 0) {
      dispatch({ type: "LOAD_WISHLIST", payload: savedItems })
    }
  }, [])

  const isWished = useMemo(() => {
    const wishlistIds = new Set(state.items.map((item) => item.id))
    return (id) => wishlistIds.has(id)
  }, [state.items])

  const addToWishlist = useCallback((product) => {
    const alreadyExists = state.items.some((item) => item.id === product.id)
    if (alreadyExists) {
      console.warn("Product already in wishlist:", product.id)
      return
    }

    dispatch({ type: "ADD_TO_WISHLIST", payload: product })
    
    const newItems = [...state.items, product]
    saveWishlistToLocalStorage(newItems)
  }, [state.items])

  const removeFromWishlist = useCallback((id) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id })
    
    const newItems = state.items.filter((item) => item.id !== id)
    saveWishlistToLocalStorage(newItems)
  }, [state.items])

  const toggleWishlist = useCallback((product) => {
    if (isWished(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }, [isWished, addToWishlist, removeFromWishlist])

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        isWished,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
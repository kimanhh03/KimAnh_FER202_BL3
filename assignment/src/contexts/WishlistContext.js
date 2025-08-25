import { createContext, useContext, useReducer, useEffect, useMemo } from "react"

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

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      dispatch({ type: "LOAD_WISHLIST", payload: JSON.parse(savedWishlist) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.items))
  }, [state.items])

  const isWished = useMemo(() => {
    const wishlistIds = new Set(state.items.map((item) => item.id))
    return (id) => wishlistIds.has(id)
  }, [state.items])

  const addToWishlist = (product) => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: product })
  }

  const removeFromWishlist = (id) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id })
  }

  const toggleWishlist = (product) => {
    if (isWished(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

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

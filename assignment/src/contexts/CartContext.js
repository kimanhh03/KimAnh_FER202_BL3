import { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react"

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) => (item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item)),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case "INCREMENT_QTY":
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.payload ? { ...item, qty: item.qty + 1 } : item)),
      }

    case "DECREMENT_QTY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, qty: Math.max(1, item.qty - 1) } : item,
        ),
      }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      }

    case "LOAD_CART":
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

const saveCartToLocalStorage = (items) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items))
  } catch (error) {
    console.error("Error saving cart to localStorage:", error)
  }
}

const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  } catch (error) {
    console.error("Error loading cart from localStorage:", error)
    return []
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const savedItems = loadCartFromLocalStorage()
    if (savedItems.length > 0) {
      dispatch({ type: "LOAD_CART", payload: savedItems })
    }
  }, [])

  const count = useMemo(() => {
    return state.items.reduce((total, item) => total + item.qty, 0)
  }, [state.items])

  const subtotal = useMemo(() => {
    return state.items.reduce((total, item) => {
      const price = item.salePrice || item.price
      return total + price * item.qty
    }, 0)
  }, [state.items])

  const addToCart = useCallback((product) => {
    dispatch({ type: "ADD_TO_CART", payload: product })
    
    const existingItem = state.items.find((item) => item.id === product.id)
    let newItems
    
    if (existingItem) {
      newItems = state.items.map((item) => 
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      )
    } else {
      newItems = [...state.items, { ...product, qty: 1 }]
    }
    
    saveCartToLocalStorage(newItems)
  }, [state.items])

  const removeFromCart = useCallback((id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
    
    const newItems = state.items.filter((item) => item.id !== id)
    saveCartToLocalStorage(newItems)
  }, [state.items])

  const incrementQty = useCallback((id) => {
    dispatch({ type: "INCREMENT_QTY", payload: id })
    
    const newItems = state.items.map((item) => 
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    )
    saveCartToLocalStorage(newItems)
  }, [state.items])

  const decrementQty = useCallback((id) => {
    dispatch({ type: "DECREMENT_QTY", payload: id })
    
    const newItems = state.items.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
    )
    saveCartToLocalStorage(newItems)
  }, [state.items])

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" })
    saveCartToLocalStorage([])
  }, [])

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        count,
        subtotal,
        addToCart,
        removeFromCart,
        incrementQty,
        decrementQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
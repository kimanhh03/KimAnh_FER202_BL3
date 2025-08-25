import { createContext, useContext, useReducer, useEffect, useMemo } from "react"

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

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items))
  }, [state.items])

  const count = useMemo(() => {
    return state.items.reduce((total, item) => total + item.qty, 0)
  }, [state.items])

  const subtotal = useMemo(() => {
    return state.items.reduce((total, item) => {
      const price = item.salePrice || item.price
      return total + price * item.qty
    }, 0)
  }, [state.items])

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product })
  }

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
  }

  const incrementQty = (id) => {
    dispatch({ type: "INCREMENT_QTY", payload: id })
  }

  const decrementQty = (id) => {
    dispatch({ type: "DECREMENT_QTY", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

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

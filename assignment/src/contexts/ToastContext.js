import { createContext, useContext, useReducer, useCallback } from "react"

const ToastContext = createContext()

const toastReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, { ...action.payload, id: Date.now() }],
      }
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      }
    default:
      return state
  }
}

const initialState = {
  toasts: [],
}

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState)

  const addToast = useCallback((message, variant = "success") => {
    const toast = { message, variant }
    dispatch({ type: "ADD_TOAST", payload: toast })

    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", payload: toast.id })
    }, 3000)
  }, [])

  const removeToast = useCallback((id) => {
    dispatch({ type: "REMOVE_TOAST", payload: id })
  }, [])

  return (
    <ToastContext.Provider
      value={{
        toasts: state.toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

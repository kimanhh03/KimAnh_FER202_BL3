import React, { createContext, useContext, useReducer } from "react";

const ToastContext = createContext();

const toastReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, { ...action.payload, id: Date.now() }];
    
    case "REMOVE_TOAST":
      return state.filter(toast => toast.id !== action.payload);
    
    default:
      return state;
  }
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const addToast = (message, variant = "success") => {
    dispatch({
      type: "ADD_TOAST",
      payload: { message, variant }
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast();
    }, 3000);
  };

  const removeToast = (id) => {
    if (id) {
      dispatch({ type: "REMOVE_TOAST", payload: id });
    } else {
      if (toasts.length > 0) {
        dispatch({ type: "REMOVE_TOAST", payload: toasts[0].id });
      }
    }
  };

  return (
    <ToastContext.Provider value={{
      toasts,
      addToast,
      removeToast
    }}>
      {children}
    </ToastContext.Provider>
  );
};
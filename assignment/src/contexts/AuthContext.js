import { createContext, useContext, useReducer, useEffect, useCallback } from "react"
import axios from "axios"

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    case "SET_REDIRECT":
      return {
        ...state,
        redirectAfterLogin: action.payload,
      }
    case "CLEAR_REDIRECT":
      return {
        ...state,
        redirectAfterLogin: null,
      }
    case "INIT_AUTH":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
      }
    default:
      return state
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
  redirectAfterLogin: null,
  isInitialized: false,
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth")
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth)
        if (authData.user) {
          dispatch({
            type: "INIT_AUTH",
            payload: {
              user: authData.user,
              isAuthenticated: true,
            },
          })
          return
        }
      } catch (error) {
        console.error("Error parsing saved auth:", error)
        localStorage.removeItem("auth")
      }
    }
    dispatch({
      type: "INIT_AUTH",
      payload: {
        user: null,
        isAuthenticated: false,
      },
    })
  }, []) 

  useEffect(() => {
    if (!state.isInitialized) return

    if (state.isAuthenticated && state.user) {
      localStorage.setItem("auth", JSON.stringify({ user: state.user }))
    } else {
      localStorage.removeItem("auth")
    }
  }, [state.isAuthenticated, state.user, state.isInitialized])

  const login = useCallback(async (email, password) => {
    try {
      const response = await axios.get("http://localhost:3002/accounts", {
        params: {
          email: email,
          password: password
        }
      })
      
      const accounts = response.data

      if (accounts.length > 0) {
        const user = accounts[0]
        const userData = {
          id: user.id,
          name: user.fullName || user.username,
          email: user.email,
        }
        
        dispatch({
          type: "LOGIN",
          payload: { user: userData },
        })
        
        return { success: true }
      } else {
        return { success: false, error: "Invalid email or password" }
      }
    } catch (error) {
      console.error("Login error:", error)
      
      // Handle different types of axios errors
      if (error.response) {
        // Server responded with error status
        return { 
          success: false, 
          error: `Server error: ${error.response.status}` 
        }
      } else if (error.request) {
        // Network error
        return { 
          success: false, 
          error: "Network error - please check your connection" 
        }
      } else {
        // Other error
        return { 
          success: false, 
          error: error.message || "Connection error to server" 
        }
      }
    }
  }, [])

  const register = useCallback(async (userData) => {
    try {
      // Check if email already exists
      const checkResponse = await axios.get("http://localhost:3002/accounts", {
        params: {
          email: userData.email
        }
      })
      
      const existingAccounts = checkResponse.data
      
      if (existingAccounts.length > 0) {
        return { success: false, error: "Email already exists" }
      }

      const newUser = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        secretQuestion: userData.secretQuestion,
        secretAnswer: userData.secretAnswer,
        wishlist: [],
      }

      const response = await axios.post("http://localhost:3002/accounts", newUser, {
        headers: { 
          "Content-Type": "application/json" 
        }
      })

      // Axios automatically throws for 4xx/5xx status codes
      const userDataForState = {
        id: newUser.id,
        name: newUser.fullName,
        email: newUser.email,
      }
      
      dispatch({
        type: "LOGIN",
        payload: { user: userDataForState },
      })
      
      return { success: true }
      
    } catch (error) {
      console.error("Register error:", error)
      
      // Handle different types of axios errors
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 400) {
          return { success: false, error: "Invalid registration data" }
        } else if (error.response.status === 409) {
          return { success: false, error: "Email already exists" }
        } else {
          return { 
            success: false, 
            error: `Registration failed: ${error.response.status}` 
          }
        }
      } else if (error.request) {
        // Network error
        return { 
          success: false, 
          error: "Network error - please check your connection" 
        }
      } else {
        // Other error
        return { 
          success: false, 
          error: error.message || "Registration failed" 
        }
      }
    }
  }, [])

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" })
  }, [])

  const setRedirect = useCallback((path) => {
    dispatch({ type: "SET_REDIRECT", payload: path })
  }, [])

  const clearRedirect = useCallback(() => {
    dispatch({ type: "CLEAR_REDIRECT" })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        setRedirect,
        clearRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
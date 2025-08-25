import { createContext, useContext, useReducer, useEffect, useCallback } from "react"

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
      const response = await fetch(
        `http://localhost:3002/accounts?email=${email}&password=${password}`
      )
      const accounts = await response.json()

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
      return { success: false, error: "Connection error to server" }
    }
  }, [])

  const register = useCallback(async (userData) => {
    try {
      const checkResponse = await fetch(`http://localhost:3002/accounts?email=${userData.email}`)
      const existingAccounts = await checkResponse.json()
      
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

      const response = await fetch("http://localhost:3002/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })

      if (response.ok) {
        const userData = {
          id: newUser.id,
          name: newUser.fullName,
          email: newUser.email,
        }
        
        dispatch({
          type: "LOGIN",
          payload: { user: userData },
        })
        
        return { success: true }
      } else {
        return { success: false, error: "Registration failed" }
      }
    } catch (error) {
      console.error("Register error:", error)
      return { success: false, error: "Registration failed" }
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
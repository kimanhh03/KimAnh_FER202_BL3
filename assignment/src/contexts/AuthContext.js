import { createContext, useContext, useReducer, useEffect } from "react"

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
    default:
      return state
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
  redirectAfterLogin: null,
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth")
    if (savedAuth) {
      const authData = JSON.parse(savedAuth)
      dispatch({ type: "LOGIN", payload: { user: authData.user } })
    }
  }, [])

  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem("auth", JSON.stringify({ user: state.user }))
    } else {
      localStorage.removeItem("auth")
    }
  }, [state.isAuthenticated, state.user])

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `http://localhost:3001/accounts?email=${email}&password=${password}`
      )
      const accounts = await response.json()

      if (accounts.length > 0) {
        const user = accounts[0]
        dispatch({
          type: "LOGIN",
          payload: {
            user: {
              id: user.id,
              name: user.fullName || user.username,
              email: user.email,
            },
          },
        })
        return { success: true }
      } else {
        return { success: false, error: "Email hoặc mật khẩu không đúng" }
      }
    } catch (error) {
      return { success: false, error: "Lỗi kết nối đến server" }
    }
  }

  const register = async (userData) => {
    try {
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

      await fetch("http://localhost:3001/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })

      dispatch({
        type: "LOGIN",
        payload: {
          user: {
            id: newUser.id,
            name: newUser.fullName,
            email: newUser.email,
          },
        },
      })

      return { success: true }
    } catch (error) {
      return { success: false, error: "Lỗi đăng ký" }
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  const setRedirect = (path) => {
    dispatch({ type: "SET_REDIRECT", payload: path })
  }

  const clearRedirect = () => {
    dispatch({ type: "CLEAR_REDIRECT" })
  }

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

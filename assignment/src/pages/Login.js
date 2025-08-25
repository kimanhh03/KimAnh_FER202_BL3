import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"
import { useNavigate, useSearchParams } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated, setRedirect, redirectAfterLogin, clearRedirect, isInitialized } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const redirectUri = searchParams.get("redirect_uri")
    if (redirectUri) {
      setRedirect(redirectUri)
    }
  }, [searchParams, setRedirect])

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      const redirectPath = redirectAfterLogin || "/"
      clearRedirect()
      navigate(redirectPath, { replace: true })
    }
  }, [isAuthenticated, isInitialized, redirectAfterLogin, clearRedirect, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    
    try {
      const result = await login(email, password)
      if (result.success) {
        addToast("Login successful!", "success")
      } else {
        setError(result.error)
        addToast(result.error, "danger")
        setLoading(false)
      }
    } catch (error) {
      const errorMessage = "Login failed. Please try again."
      setError(errorMessage)
      addToast(errorMessage, "danger")
      setLoading(false)
    }
  }

  if (!isInitialized) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card>
              <Card.Body className="text-center">
                <div>Loading...</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card>
            <Card.Header>
              <h4 className="text-center mb-0">Sign In</h4>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </Form>
              <hr />
              <div className="text-center">
                <p className="mb-2">New customer?</p>
                <Link to="/register" className="btn btn-outline-primary">
                  Create an account
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"
import { useNavigate, useSearchParams } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login, isAuthenticated, setRedirect, redirectAfterLogin, clearRedirect } = useAuth()
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
    if (isAuthenticated) {
      const redirectPath = redirectAfterLogin || "/"
      clearRedirect()
      navigate(redirectPath)
    }
  }, [isAuthenticated, redirectAfterLogin, clearRedirect, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await login(email, password)

    if (result.success) {
      addToast("Login successful!", "success")
    } else {
      setError(result.error)
      addToast(result.error, "danger")
    }

    setLoading(false)
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card>
            <Card.Header>
              <h4 className="text-center mb-0">Login</h4>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </Form>

              <hr />

              <div className="text-center">
                <p className="mb-2">New customer?</p>
                <LinkContainer to="/register">
                  <Button variant="outline-primary">Create an account</Button>
                </LinkContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login

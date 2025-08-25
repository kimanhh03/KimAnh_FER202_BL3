// src/pages/Register.js
import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, ProgressBar } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: null,
    username: "",
    password: "",
    confirmPassword: "",
    secretQuestion: "",
    secretAnswer: "",
  })
  const [avatarPreview, setAvatarPreview] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const { register, isAuthenticated, redirectAfterLogin, clearRedirect } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const secretQuestions = [
    "What is the name of your first pet?",
    "What is the name of your elementary school?",
    "What is your favorite color?",
    "What is the name of your best friend?",
    "What city were you born in?",
  ]

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = redirectAfterLogin || "/"
      clearRedirect()
      navigate(redirectPath)
    }
  }, [isAuthenticated, redirectAfterLogin, clearRedirect, navigate])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, avatar: "File size must not exceed 2MB" }))
        return
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setErrors((prev) => ({ ...prev, avatar: "Only JPG or PNG files are allowed" }))
        return
      }
      setFormData((prev) => ({ ...prev, avatar: file }))
      setAvatarPreview(URL.createObjectURL(file))
      setErrors((prev) => ({ ...prev, avatar: "" }))
    }
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.username.trim()) newErrors.username = "Username is required"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(formData.password))
      newErrors.password = "Password must contain uppercase, lowercase and a special character"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!formData.secretQuestion) newErrors.secretQuestion = "Please select a secret question"
    if (!formData.secretAnswer.trim()) newErrors.secretAnswer = "Secret answer is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2)
  }

  const handlePrevious = () => {
    if (currentStep === 2) setCurrentStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return
    setLoading(true)
    const result = await register(formData)
    if (result.success) {
      addToast("Registration successful. You are now logged in.", "success")
      navigate("/") // redirect to Home immediately so header links work
    } else {
      addToast(result.error, "danger")
    }
    setLoading(false)
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="text-center mb-3">Register Account</h4>
              <ProgressBar now={(currentStep / 2) * 100} />
            </Card.Header>
            <Card.Body>
              {currentStep === 1 && (
                <Form>
                  <h5 className="mb-3">Personal Information</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      isInvalid={!!errors.fullName}
                    />
                    <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Avatar (≤2MB, JPG/PNG)</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleAvatarChange}
                      isInvalid={!!errors.avatar}
                    />
                    <Form.Control.Feedback type="invalid">{errors.avatar}</Form.Control.Feedback>
                    {avatarPreview && (
                      <div className="mt-2">
                        <img
                          src={avatarPreview || "/placeholder.svg"}
                          alt="Avatar preview"
                          style={{ width: "100px", height: "100px", objectFit: "cover" }}
                          className="rounded"
                        />
                      </div>
                    )}
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" onClick={handleNext}>
                      Next
                    </Button>
                  </div>
                </Form>
              )}

              {currentStep === 2 && (
                <Form onSubmit={handleSubmit}>
                  <h5 className="mb-3">Account Information</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Username *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password *</Form.Label>
                    <Form.Control
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      At least 6 characters, must include uppercase, lowercase, and a special character
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password *</Form.Label>
                    <Form.Control
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Secret Question *</Form.Label>
                    <Form.Select
                      value={formData.secretQuestion}
                      onChange={(e) => handleInputChange("secretQuestion", e.target.value)}
                      isInvalid={!!errors.secretQuestion}
                    >
                      <option value="">Select a secret question</option>
                      {secretQuestions.map((q, i) => (
                        <option key={i} value={q}>
                          {q}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.secretQuestion}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Secret Answer *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.secretAnswer}
                      onChange={(e) => handleInputChange("secretAnswer", e.target.value)}
                      isInvalid={!!errors.secretAnswer}
                    />
                    <Form.Control.Feedback type="invalid">{errors.secretAnswer}</Form.Control.Feedback>
                  </Form.Group>
                  <Row>
                    <Col>
                      <Button variant="outline-secondary" onClick={handlePrevious}>
                        Back
                      </Button>
                    </Col>
                    <Col className="text-end">
                      <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Register

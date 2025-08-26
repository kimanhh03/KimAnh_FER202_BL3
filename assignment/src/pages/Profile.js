import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Alert, Image, Modal } from "react-bootstrap"
import { User, Camera, Lock, Save, Eye, EyeOff } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"

const Profile = () => {
  const { user, isAuthenticated, isInitialized } = useAuth()
  const { addToast } = useToast()
  
  const [avatarPreview, setAvatarPreview] = useState("")
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    avatar: null
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.name || "",
        email: user.email || "",
        dateOfBirth: user.dateOfBirth || "",
        avatar: null
      })
    }
  }, [user])

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }))
  }

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, avatar: "File size must not exceed 2MB" }))
        return
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setErrors(prev => ({ ...prev, avatar: "Only JPG or PNG files are allowed" }))
        return
      }
      setProfileData(prev => ({ ...prev, avatar: file }))
      setAvatarPreview(URL.createObjectURL(file))
      setErrors(prev => ({ ...prev, avatar: "" }))
    }
  }

  const validateProfile = () => {
    const newErrors = {}
    if (!profileData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!profileData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(profileData.email)) newErrors.email = "Invalid email format"
    
    if (profileData.dateOfBirth) {
      const today = new Date()
      const birthDate = new Date(profileData.dateOfBirth)
      if (birthDate > today) newErrors.dateOfBirth = "Date of birth cannot be in the future"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePassword = () => {
    const newErrors = {}
    if (!passwordData.currentPassword) newErrors.currentPassword = "Current password is required"
    if (!passwordData.newPassword) newErrors.newPassword = "New password is required"
    else if (passwordData.newPassword.length < 6) newErrors.newPassword = "Password must be at least 6 characters"
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(passwordData.newPassword))
      newErrors.newPassword = "Password must contain uppercase, lowercase and a special character"
    if (passwordData.newPassword !== passwordData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (passwordData.currentPassword === passwordData.newPassword) newErrors.newPassword = "New password must be different from current password"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    if (!validateProfile()) return
    
    setLoading(true)
    try {
      await fetch(`http://localhost:3002/accounts/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: profileData.fullName,
          email: profileData.email,
          dateOfBirth: profileData.dateOfBirth
        }),
      })
      addToast("Profile updated successfully!", "success")
    } catch (error) {
      addToast("Failed to update profile", "danger")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (!validatePassword()) return
    
    setPasswordLoading(true)
    try {
      const verifyResponse = await fetch(
        `http://localhost:3002/accounts?id=${user.id}&password=${passwordData.currentPassword}`
      )
      const accounts = await verifyResponse.json()
      if (accounts.length === 0) {
        setErrors({ currentPassword: "Current password is incorrect" })
        setPasswordLoading(false)
        return
      }
      await fetch(`http://localhost:3002/accounts/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordData.newPassword }),
      })
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setShowPasswordModal(false)
      addToast("Password changed successfully!", "success")
    } catch (error) {
      addToast("Failed to change password", "danger")
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false)
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setErrors({})
  }

  if (!isInitialized) return <Container>Loading...</Container>
  if (!isAuthenticated) return (
    <Container className="text-center py-5">
      <Alert variant="warning">Please log in to view your profile.</Alert>
    </Container>
  )

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="mb-4 text-center">
            <h2>Profile Settings</h2>
            <p className="text-muted">Manage your account information and security</p>
          </div>
          <Row>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Header>
                  <h5><Camera size={20} className="me-2" />Profile Picture</h5>
                </Card.Header>
                <Card.Body className="text-center">
                  <Image
                    src={avatarPreview || "https://via.placeholder.com/150x150?text=Avatar"}
                    roundedCircle
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <Form.Group className="mt-3">
                    <Form.Control
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleAvatarChange}
                      style={{ display: "none" }}
                      id="avatar-upload"
                    />
                    <Button variant="secondary" onClick={() => document.getElementById("avatar-upload").click()}>
                      Select File
                    </Button>
                    {avatarPreview && <span className="ms-2">{avatarPreview.split("/").pop()}</span>}
                    <Form.Text className="text-muted d-block mt-1">Max 2MB, JPG or PNG only</Form.Text>
                    <Form.Control.Feedback type="invalid">{errors.avatar}</Form.Control.Feedback>
                  </Form.Group>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>
                  <h5><Lock size={20} className="me-2" />Security</h5>
                </Card.Header>
                <Card.Body>
                  <Button variant="outline-warning" className="w-100" onClick={() => setShowPasswordModal(true)}>
                    Change Password
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <Card>
                <Card.Header>
                  <h5><User size={20} className="me-2" />Personal Information</h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleProfileSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            value={profileData.fullName}
                            onChange={e => handleInputChange("fullName", e.target.value)}
                            isInvalid={!!errors.fullName}
                            placeholder="Enter your full name"
                          />
                          <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email *</Form.Label>
                          <Form.Control
                            type="email"
                            value={profileData.email}
                            onChange={e => handleInputChange("email", e.target.value)}
                            isInvalid={!!errors.email}
                            placeholder="Enter your email"
                          />
                          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={e => handleInputChange("dateOfBirth", e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        isInvalid={!!errors.dateOfBirth}
                      />
                      <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid">
                      <Button type="submit" variant="warning" disabled={loading}>
                        <Save size={16} className="me-2" />
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal show={showPasswordModal} onHide={handleClosePasswordModal} centered>
        <Modal.Header closeButton>
          <Modal.Title><Lock size={20} className="me-2" />Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Current Password *</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={e => handlePasswordChange("currentPassword", e.target.value)}
                  isInvalid={!!errors.currentPassword}
                  placeholder="Enter current password"
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="position-absolute end-0 top-0 me-1 mt-1"
                  style={{ border: "none", background: "none" }}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">{errors.currentPassword}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password *</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={e => handlePasswordChange("newPassword", e.target.value)}
                  isInvalid={!!errors.newPassword}
                  placeholder="Enter new password"
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="position-absolute end-0 top-0 me-1 mt-1"
                  style={{ border: "none", background: "none" }}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password *</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={e => handlePasswordChange("confirmPassword", e.target.value)}
                  isInvalid={!!errors.confirmPassword}
                  placeholder="Confirm new password"
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="position-absolute end-0 top-0 me-1 mt-1"
                  style={{ border: "none", background: "none" }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePasswordModal}>Cancel</Button>
          <Button variant="warning" onClick={handlePasswordSubmit} disabled={passwordLoading}>
            {passwordLoading ? "Changing..." : "Change Password"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Profile

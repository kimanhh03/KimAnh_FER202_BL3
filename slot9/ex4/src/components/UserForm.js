import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Alert } from "react-bootstrap";

const UserForm = ({ title, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validateForm = () => {
    const newErrors = {};
    const nameTrim = formData.name.trim();
    if (!nameTrim) newErrors.name = "Tên không được để trống!";
    else if (nameTrim.length < 3) newErrors.name = "Tên phải có ít nhất 3 ký tự!";
    else if (nameTrim.length > 50) newErrors.name = "Tên không được vượt quá 50 ký tự!";

    const ageNum = parseInt(formData.age, 10);
    if (!formData.age) newErrors.age = "Tuổi không được để trống!";
    else if (isNaN(ageNum)) newErrors.age = "Tuổi phải là một số hợp lệ!";
    else if (ageNum < 18 || ageNum > 100) newErrors.age = "Tuổi phải từ 18 đến 100!";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email không được để trống!";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Email không đúng định dạng!";

    const phoneRegex = /^\d{10,15}$/;
    if (!formData.phone) newErrors.phone = "Số điện thoại không được để trống!";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "SĐT phải từ 10–15 chữ số!";

    if (!formData.agreeTerms) newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản!";

    setErrors(newErrors);
    setShowAlert(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ name: "", age: "", email: "", phone: "", agreeTerms: false });
      setErrors({});
      setShowAlert(false);
    }
  };

  return (
    <Container>
      <h6 className="mb-3">{title}</h6>
      {showAlert && (
        <Alert variant="danger">
          <strong>Lỗi:</strong> Vui lòng kiểm tra và điền đầy đủ thông tin hợp lệ.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="b4Name">
          <Form.Label>Tên <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
            placeholder="Nhập tên (3–50 ký tự)"
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          <Form.Text muted>{formData.name.length}/50 ký tự</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="b4Age">
          <Form.Label>Tuổi <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="number"
            name="age"
            min="18"
            max="100"
            value={formData.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
            placeholder="18–100"
          />
          <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="b4Email">
          <Form.Label>Email <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            placeholder="example@email.com"
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="b4Phone">
          <Form.Label>Số điện thoại <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={!!errors.phone}
            placeholder="0123456789"
          />
          <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          <Form.Text muted>{formData.phone.length}/15 chữ số</Form.Text>
        </Form.Group>

        <Form.Group className="mb-4" controlId="b4Terms">
          <Form.Check
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            isInvalid={!!errors.agreeTerms}
            label={<>Tôi đồng ý với điều khoản và điều kiện <span className="text-danger">*</span></>}
          />
          {errors.agreeTerms && <div className="text-danger mt-1">{errors.agreeTerms}</div>}
        </Form.Group>

        <Button type="submit" variant="success" size="lg">Đăng ký</Button>
      </Form>
    </Container>
  );
};

UserForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UserForm;

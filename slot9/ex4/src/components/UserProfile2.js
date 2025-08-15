import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container } from "react-bootstrap";

const UserProfile2 = ({ name, age, onSubmit }) => {
  const [formData, setFormData] = useState({ name, age });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name: field, value } = e.target;
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const parsedAge = parseInt(formData.age, 10);

    if (!formData.name) newErrors.name = "Tên là bắt buộc";
    if (!formData.age) newErrors.age = "Tuổi không được để trống!";
    else if (isNaN(parsedAge)) newErrors.age = "Tuổi phải là một số hợp lệ!";
    else if (parsedAge < 18 || parsedAge > 100) newErrors.age = "Tuổi phải nằm trong khoảng 18–100!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  return (
    <Container>
      <h6 className="mb-3">Thông Tin Người Dùng</h6>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="b2Name">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="b2Age">
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">Gửi</Button>
      </Form>
    </Container>
  );
};

UserProfile2.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSubmit: PropTypes.func.isRequired,
};

export default UserProfile2;

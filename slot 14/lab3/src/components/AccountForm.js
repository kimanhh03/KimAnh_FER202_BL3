import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import PropTypes from 'prop-types';

const AccountForm = ({
  state,
  updateField,
  showPassword,
  showConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  markFieldTouched
}) => {
  const { account } = state;
  
  const isPasswordValid = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleBlur = (field) => {
    markFieldTouched('account', field);
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={account.username}
          onChange={(e) => updateField('account', 'username', e.target.value)}
          onBlur={() => handleBlur('username')}
          isInvalid={state.touched.account.username && (account.username.length < 6 || !account.username)}
        />
        {state.touched.account.username && !account.username && (
          <Form.Control.Feedback type="invalid">
            Username is required
          </Form.Control.Feedback>
        )}
        {state.touched.account.username && account.username && account.username.length < 6 && (
          <Form.Control.Feedback type="invalid">
            Username must be at least 6 characters
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            value={account.password}
            onChange={(e) => updateField('account', 'password', e.target.value)}
            onBlur={() => handleBlur('password')}
            isInvalid={state.touched.account.password && (!account.password || (account.password && !isPasswordValid(account.password)))}
          />
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </InputGroup>
        {state.touched.account.password && !account.password && (
          <Form.Control.Feedback type="invalid" style={{display: 'block'}}>
            Password is required
          </Form.Control.Feedback>
        )}
        {state.touched.account.password && account.password && !isPasswordValid(account.password) && (
          <Form.Control.Feedback type="invalid" style={{display: 'block'}}>
            Password must be at least 8 characters with uppercase, lowercase, number, and special character
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showConfirmPassword ? 'text' : 'password'}
            value={account.confirmPassword}
            onChange={(e) => updateField('account', 'confirmPassword', e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
            isInvalid={state.touched.account.confirmPassword && (!account.confirmPassword || (account.confirmPassword && account.password !== account.confirmPassword))}
          />
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </InputGroup>
        {state.touched.account.confirmPassword && !account.confirmPassword && (
          <Form.Control.Feedback type="invalid" style={{display: 'block'}}>
            Please confirm your password
          </Form.Control.Feedback>
        )}
        {state.touched.account.confirmPassword && account.confirmPassword && account.password !== account.confirmPassword && (
          <Form.Control.Feedback type="invalid" style={{display: 'block'}}>
            Passwords do not match
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Secret Question</Form.Label>
        <Form.Select
          value={account.secretQuestion}
          onChange={(e) => updateField('account', 'secretQuestion', e.target.value)}
          onBlur={() => handleBlur('secretQuestion')}
          isInvalid={state.touched.account.secretQuestion && !account.secretQuestion}
        >
          <option value="">-- Select a question --</option>
          <option value="pet">What is your first pet's name?</option>
          <option value="maiden">What is your mother's maiden name?</option>
          <option value="city">In which city were you born?</option>
          <option value="teacher">Who was your favorite teacher?</option>
        </Form.Select>
        {state.touched.account.secretQuestion && !account.secretQuestion && (
          <Form.Control.Feedback type="invalid">
            Please select a secret question
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          type="text"
          value={account.answer}
          onChange={(e) => updateField('account', 'answer', e.target.value)}
          onBlur={() => handleBlur('answer')}
          isInvalid={state.touched.account.answer && !account.answer}
        />
        {state.touched.account.answer && !account.answer && (
          <Form.Control.Feedback type="invalid">
            Please enter your answer
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </Form>
  );
};

AccountForm.propTypes = {
  state: PropTypes.object.isRequired,
  updateField: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  showConfirmPassword: PropTypes.bool.isRequired,
  setShowPassword: PropTypes.func.isRequired,
  setShowConfirmPassword: PropTypes.func.isRequired,
  markFieldTouched: PropTypes.func.isRequired
};

export default AccountForm;
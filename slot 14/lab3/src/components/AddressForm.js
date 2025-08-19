import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddressForm = ({ state, updateField, markFieldTouched }) => {
  const { address } = state;
  
  const handleBlur = (field) => {
    markFieldTouched('address', field);
  };
  
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={address.address}
          onChange={(e) => updateField('address', 'address', e.target.value)}
          onBlur={() => handleBlur('address')}
          placeholder="Enter your address"
          isInvalid={state.touched.address.address && !address.address}
        />
        {state.touched.address.address && !address.address && (
          <Form.Control.Feedback type="invalid">
            Please enter your address
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={address.city}
          onChange={(e) => updateField('address', 'city', e.target.value)}
          onBlur={() => handleBlur('city')}
          placeholder="Enter city"
          isInvalid={state.touched.address.city && !address.city}
        />
        {state.touched.address.city && !address.city && (
          <Form.Control.Feedback type="invalid">
            Please enter your city
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select
          value={address.country}
          onChange={(e) => updateField('address', 'country', e.target.value)}
          onBlur={() => handleBlur('country')}
          isInvalid={state.touched.address.country && !address.country}
        >
          <option value="">-- Select Country --</option>
          <option value="vietnam">Vietnam</option>
          <option value="korea">Korea</option>
          <option value="italy">Italy</option>
          <option value="usa">United States</option>
          <option value="japan">Japan</option>
          <option value="singapore">Singapore</option>
        </Form.Select>
        {state.touched.address.country && !address.country && (
          <Form.Control.Feedback type="invalid">
            Please select your country
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </Form>
  );
};

AddressForm.propTypes = {
  state: PropTypes.object.isRequired,
  updateField: PropTypes.func.isRequired,
  markFieldTouched: PropTypes.func.isRequired
};

export default AddressForm;
import React, { useState, useEffect } from "react";

const validateInput = (value) => {
  return value.length >= 5;
};

function ValidatedInput() {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const isValidInput = validateInput(value);
    setIsValid(isValidInput);
    
    if (!isValidInput) {
      setErrorMessage("Giá trị phải có ít nhất 5 ký tự!");
    } else {
      setErrorMessage("");
    }
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && value.length >= 5) {
      alert("Form đã được gửi!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Form Validation</h2>
              
              <div className="mb-3">
                <label htmlFor="validatedInput" className="form-label">
                  Nhập một giá trị
                </label>
                <input
                  type="text"
                  id="validatedInput"
                  className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                {!isValid && (
                  <div className="invalid-feedback">
                    {errorMessage}
                  </div>
                )}
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!isValid}
                className="btn btn-primary w-100"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValidatedInput;
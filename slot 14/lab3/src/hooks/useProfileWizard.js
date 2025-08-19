import { useState, useMemo, useCallback, useReducer } from 'react';

const profileReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.field]: action.value
        },
        touched: {
          ...state.touched,
          [action.section]: {
            ...state.touched[action.section],
            [action.field]: true
          }
        }
      };
    case 'MARK_FIELD_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.section]: {
            ...state.touched[action.section],
            [action.field]: true
          }
        }
      };
    case 'SET_STEP':
      return { ...state, currentStep: action.step };
    case 'RESET':
      return action.initialState;
    default:
      return state;
  }
};

const initialState = {
  currentStep: 0,
  about: {
    firstName: '',
    lastName: '',
    email: '',
    avatar: null
  },
  account: {
    username: '',
    password: '',
    confirmPassword: '',
    secretQuestion: '',
    answer: ''
  },
  address: {
    address: '',
    city: '',
    country: ''
  },
  touched: {
    about: {},
    account: {},
    address: {}
  }
};

export const useProfileWizard = () => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const updateField = useCallback((section, field, value) => {
    dispatch({ type: 'UPDATE_FIELD', section, field, value });
  }, []);

  const markFieldTouched = useCallback((section, field) => {
    dispatch({ type: 'MARK_FIELD_TOUCHED', section, field });
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      updateField('about', 'avatar', file);
    }
  }, [updateField]);

  const validateStep = useMemo(() => {
    const { about, account, address } = state;
    
    switch (state.currentStep) {
      case 0:
        // About form validation: firstName, lastName, email required
        const isEmailValid = /\S+@\S+\.\S+/.test(about.email);
        return about.firstName && about.lastName && about.email && isEmailValid;
      case 1:
        // Account form validation
        const isUsernameValid = account.username.length >= 6;
        const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(account.password);
        const isPasswordMatch = account.password === account.confirmPassword && account.password !== '';
        return isUsernameValid && isPasswordValid && isPasswordMatch && account.secretQuestion && account.answer;
      case 2:
        // Address form validation: address, city, country required
        return address.address && address.city && address.country;
      default:
        return false;
    }
  }, [state]);

  const progress = useMemo(() => {
    return ((state.currentStep + 1) / 3) * 100;
  }, [state.currentStep]);

  const nextStep = useCallback(() => {
    if (validateStep && state.currentStep < 2) {
      dispatch({ type: 'SET_STEP', step: state.currentStep + 1 });
    }
  }, [validateStep, state.currentStep]);

  const prevStep = useCallback(() => {
    if (state.currentStep > 0) {
      dispatch({ type: 'SET_STEP', step: state.currentStep - 1 });
    }
  }, [state.currentStep]);

  const handleFinish = useCallback(() => {
    if (validateStep) {
      setShowResult(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [validateStep]);

  const resetWizard = useCallback(() => {
    dispatch({ type: 'RESET', initialState });
    setShowResult(false);
    setShowToast(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, []);

  return {
    state,
    showPassword,
    showConfirmPassword,
    showResult,
    showToast,
    setShowPassword,
    setShowConfirmPassword,
    setShowToast,
    updateField,
    markFieldTouched, 
    handleFileChange,
    validateStep,
    progress,
    nextStep,
    prevStep,
    handleFinish,
    resetWizard,
    dispatch
  };
};
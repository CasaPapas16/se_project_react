import { useState } from "react";

function validateField(name, value, rules = {}) {
  const normalizedValue = typeof value === "string" ? value.trim() : value;

  if (
    rules.required &&
    (normalizedValue === "" ||
      normalizedValue === false ||
      normalizedValue == null)
  ) {
    return rules.requiredMessage || "This field is required.";
  }

  if (rules.minLength && String(normalizedValue).length < rules.minLength) {
    return (
      rules.minLengthMessage ||
      `Must be at least ${rules.minLength} characters.`
    );
  }

  if (rules.maxLength && String(normalizedValue).length > rules.maxLength) {
    return (
      rules.maxLengthMessage ||
      `Must be no more than ${rules.maxLength} characters.`
    );
  }

  if (rules.pattern && !rules.pattern.test(String(normalizedValue))) {
    return rules.patternMessage || "Please enter a valid value.";
  }

  if (rules.validate && !rules.validate(normalizedValue)) {
    return rules.validateMessage || "Please enter a valid value.";
  }

  return "";
}

function validateValues(valuesToValidate, validationRules = {}) {
  const nextErrors = {};

  Object.entries(validationRules).forEach(([name, rules]) => {
    const errorMessage = validateField(name, valuesToValidate[name], rules);

    if (errorMessage) {
      nextErrors[name] = errorMessage;
    }
  });

  return nextErrors;
}

export function useFormWithValidation(defaultValues, validationRules = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const nextValue = type === "checkbox" ? checked : value;
    const nextValues = { ...values, [name]: nextValue };

    setValues(nextValues);

    const nextErrors = validateValues(nextValues, validationRules);
    setErrors(nextErrors);
    setIsValid(Object.keys(nextErrors).length === 0);
  };

  const validate = (valuesToValidate = values) => {
    const nextErrors = validateValues(valuesToValidate, validationRules);
    setErrors(nextErrors);
    const nextIsValid = Object.keys(nextErrors).length === 0;
    setIsValid(nextIsValid);
    return nextIsValid;
  };

  const resetForm = () => {
    setValues({ ...defaultValues });
    setErrors({});
    setIsValid(false);
    setHasSubmitted(false);
  };

  const handleSubmit = (valuesToValidate = values) => {
    setHasSubmitted(true);
    const nextErrors = validateValues(valuesToValidate, validationRules);
    setErrors(nextErrors);
    const nextIsValid = Object.keys(nextErrors).length === 0;
    setIsValid(nextIsValid);
    return nextIsValid;
  };

  return {
    values,
    errors,
    isValid,
    hasSubmitted,
    handleChange,
    resetForm,
    validate,
    handleSubmit,
    setValues,
  };
}

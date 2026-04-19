export const validateFields = (fields, form) => {
  const errors = {};

  fields.forEach((field) => {
    if (field.showIf && !field.showIf(form)) return;
    if (!field.required) return;

    const value = form[field.name];

    if (!value || (typeof value === 'string' && !value.trim())) {
      errors[field.name] = `${field.label} is required`;
      return;
    }

    if (field.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      errors[field.name] = 'Please enter a valid email address';
    }
  });

  return errors;
};

export const validatePassword = (form) => {
  const errors = {};
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$%!#*?&]).{8,}$/;

  if (!form.password) {
    errors.password = 'Password is required';
  } else if (!passwordRegex.test(form.password)) {
    errors.password = 'Use 8+ characters with letters, numbers & symbols (@$%!#*?&)';
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

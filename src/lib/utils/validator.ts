import validator from 'validator';

export const validateEmail = (email: string): boolean => {
  if (!validator.isEmail(email)) {
    return false;
  } else {
    return true;
  }
};

export const isValidPassword = (password: string): boolean => {
  const validPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return validPass.test(password);
};

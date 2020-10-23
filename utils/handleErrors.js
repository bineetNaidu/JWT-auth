// handle errors
const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  if (err.message === 'Incorrect Email') {
    errors.email = 'That Email is Not Registered';
  }

  if (err.message === 'Incorrect Password') {
    errors.password = 'That Password is incorrect';
  }

  if (err.code === 11000) {
    // duplicate email error
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('User validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

export default handleErrors;

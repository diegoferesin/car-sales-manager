const Validator = require('validatorjs');

// Create a custom validator function
const validator = (body, rules, customMessages, callback) => {
  try {
    // Initialize a new Validator instance with the provided body data, validation rules, and custom messages
    const validation = new Validator(body, rules, customMessages);

    // Check if the validation passes
    validation.passes(() => callback(null, true)); // Calls the callback with no errors and 'true' for success

    // Check if the validation fails
    validation.fails(() => callback(validation.errors.all(), false)); // Calls the callback with validation errors and 'false' for failure
  } catch (error) {
    // Handle any errors that occur during validation initialization
    callback(error, false);
  }
};

// Export the custom validator function
module.exports = validator;
const validator = require('../helpers/validate');

const saveCustomer = (req, res, next) => {
  const validationRule = {
    Username: 'required',
    Password: 'required',
    FirstName: 'required',
    LastName: 'required',
    Email: 'required',
    Phone: 'required', 
    Address: 'required',
    DateOfBirth: 'required' 
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


module.exports = {
  saveCustomer
};
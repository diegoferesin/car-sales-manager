const validator = require('../helpers/validate');

const validateInput = (data, rules) => {
  for (const key in data) {
    if (rules.hasOwnProperty(key) && typeof data[key] === rules[key]) {
      return true;
    }
  }
  return false;
};

const saveCustomer = (req, res, next) => {
  const validationRule = {
    username: 'required',
    password: 'required',
    firstName: 'required',
    lastName: 'required',
    email: 'required',
    phone: 'required',
    address: 'required',
    birthdate: 'required'
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

const saveDealeship = (req, res, next) => {
  const validationRule = {
    name: 'required',
    location: 'required',
    phone: 'required',
    email: 'required',
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

const saveInventory = (req, res, next) => {
  const validationRule = {
    carMake: 'required',
    carModel: 'required',
    carYear: 'required',
    mileage: 'required',
    price: 'required',
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

const saveOrder = (req, res, next) => {
  const validationRule = {
    customerID: 'required',
    inventoryID: 'required',
    saleDate: 'required',
    price: 'required',
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

const updateCustomer = (req, res, next) => {
  const validationRule = {
    username: "string",
    password: "string",
    firstName: "string",
    lastName: "string",
    email: "string",
    phone: "string",
    address: "string",
    birthdate: "string"
  };

  const validationResult = validateInput(req.body, validationRule);
  if (!validationResult) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      errors: 'At least one attribute should have a value'
    });
  } else {
    next();
  }
};

const updateDealership = (req, res, next) => {
  const validationRule = {
    name: "string",
    location: "string",
    phone: "string",
    email: "string",
    zipCode: "string"
  };

  const validationResult = validateInput(req.body, validationRule);
  if (!validationResult) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      errors: 'At least one attribute should have a value'
    });
  } else {
    next();
  }
};

const updateInventory = (req, res, next) => {
  const validationRule = {
    carMake: "string",
    carModel: "string",
    carYear: "string",
    color: "string",
    mileage: "string",
    price: "string",
  };

  const validationResult = validateInput(req.body, validationRule);
  if (!validationResult) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      errors: 'At least one attribute should have a value'
    });
  } else {
    next();
  }
};

const updateOrder = (req, res, next) => {
  const validationRule = {
    customerID: "string",
    inventoryID: "string",
    saleDate: "string",
    dealership: "string",
    price: "string",
  };

  const validationResult = validateInput(req.body, validationRule);
  if (!validationResult) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      errors: 'At least one attribute should have a value'
    });
  } else {
    next();
  }
};


module.exports = {
  saveCustomer,
  updateCustomer,

  saveDealeship,
  updateDealership,

  saveInventory,
  updateInventory,

  saveOrder,
  updateOrder
};
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

//Handle GET requests for a customer
router.get('/', customerController.getCustomers);
//Handle GET requests for a customer by ID
router.get('/:id', customerController.getCustomerByID);

// Handle POST request to create a new customer
router.post('/',
    // isAuthenticated,
    validation.saveCustomer,
    customerController.createCustomer);

// Handle PUT request to update a customer by ID
router.put('/:id',
    // isAuthenticated,
    validation.updateCustomer,
    customerController.updateCustomer);

// Handle DELETE request to delete a customer by ID
router.delete('/:id',
    // isAuthenticated,
    customerController.deleteCustomerByID);

module.exports = router;
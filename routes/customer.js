const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const { isAuthenticated } = require('../middleware/authenticate');

//Handle GET requests for a customer
router.get('/', customerController.getAll);
//Handle GET requests for a customer by ID
router.get('/:id', customerController.getSingle);

// Handle POST request to create a new customer
router.post('/', isAuthenticated, customerController.createCustomer);

// Handle PUT request to update a customer by ID
router.put('/:id', isAuthenticated, customerController.updateCustomer);

// Handle DELETE request to delete a customer by ID
router.delete('/:id', isAuthenticated, customerController.deleteCustomer);

module.exports = router;
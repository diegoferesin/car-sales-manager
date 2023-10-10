const express = require('express');
const router = express.Router();
const customerController = require('../controller/customer');
const { isAuthenticated } = require('../middleware/authenticate');

//Handle GET requests for a customer
router.get('/', customerController.getAll);
//Handle GET requests for a customer by ID
router.get('/:id', customerController.getSingle);

// Handle POST request to create a new customer
router.post('/', isAuthenticated, customerController.createcustomer);

// Handle PUT request to update a customer by ID
router.put('/:id',isAuthenticated, customerController.updatecustomer);

// Handle DELETE request to delete a customer by ID
router.delete('/:id', isAuthenticated, customerController.deletecustomer); 

module.exports = router;
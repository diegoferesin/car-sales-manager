const express = require('express');
const router = express.Router();
const dealershipController = require('../controllers/dealership');
const { isAuthenticated } = require('../middleware/authenticate');

//Handle GET requests for a dealership
router.get('/', dealershipController.getAll);
//Handle GET requests for a dealership by ID
router.get('/:id', dealershipController.getSingle);

// Handle POST request to create a new customer
router.post('/', isAuthenticated, dealershipController.createdealership);

// Handle PUT request to update a customer by ID
router.put('/:id',isAuthenticated, dealershipController.updatedealership);

// Handle DELETE request to delete a dealership by ID
router.delete('/:id', isAuthenticated, dealershipController.deletedealership); 

module.exports = router;
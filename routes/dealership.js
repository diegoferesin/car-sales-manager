const express = require('express');
const router = express.Router();
const dealershipController = require('../controllers/dealership');
const isAuthenticated = require('../middleware/authenticate');
const validation = require('../middleware/validate');

//Handle GET requests for a dealership
router.get('/', dealershipController.getDealership);
//Handle GET requests for a dealership by ID
router.get('/:id',
    isAuthenticated,
    dealershipController.getDealershipByID);

// Handle POST request to create a new dealership
router.post('/',
    isAuthenticated,
    validation.saveDealeship,
    dealershipController.createDealership);

// Handle PUT request to update a dealership by ID
router.put('/:id',
    isAuthenticated,
    validation.updateDealership,
    dealershipController.updateDealershipById);

// Handle DELETE request to delete a dealership by ID
router.delete('/:id',
    isAuthenticated,
    dealershipController.deleteDealershipByID);

module.exports = router;
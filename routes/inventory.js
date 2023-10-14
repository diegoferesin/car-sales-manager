const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');
const { isAuthenticated } = require('../middleware/authenticate');
const Inventory = require('../models/inventory');
const validation = require('../middleware/validate');

//Handle GET requests for a Inventory
router.get('/', inventoryController.getInventory);
//Handle GET requests for a Inventory
router.get('/:id', inventoryController.getInventoryByID);

// Handle POST request to create a new inventory
router.post('/',
    // isAuthenticated,
    validation.saveInventory,
    inventoryController.createInventory);

// Handle PUT request to update a inventory by ID
router.put('/:id',
    // isAuthenticated,
    validation.updateInventory,
    inventoryController.updateInventoryById);

// Handle DELETE request to delete a inventory by ID
router.delete('/:id',
    // isAuthenticated,
    inventoryController.deleteInventoryById);

module.exports = router;
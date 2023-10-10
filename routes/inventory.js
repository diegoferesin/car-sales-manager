const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventory');
const { isAuthenticated } = require('../middleware/authenticate');

//Handle GET requests for a Inventory
router.get('/', inventoryController.getAll);
//Handle GET requests for a Inventory
router.get('/:id', inventoryController.getSingle);

// Handle POST request to create a new inventory
router.post('/', isAuthenticated, inventoryController.createinventory);

// Handle PUT request to update a inventory by ID
router.put('/:id',isAuthenticated, inventoryController.updateinventory);

// Handle DELETE request to delete a inventory by ID
router.delete('/:id', isAuthenticated, inventoryController.deleteinventory); 

module.exports = router;
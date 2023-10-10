// Import modules and controllers
const express = require('express');
const router = express.Router();
// Import validation middleware for request validation
const validation = require('../middleware/validate');
// Import orderController for handling order-related routes
const orderController = require('../controllers/order'); 
const { isAuthenticated } = require('../middleware/authenticate');

//Handle GET requests for a order
router.get('/', orderController.getAll);
//Handle GET requests for a order by ID
router.get('/:id', orderController.getSingle);


// Handle POST request to create a new Order
router.post('/', isAuthenticated, orderController.createorder);

// Handle PUT request to update a Order by ID
router.put('/:id',isAuthenticated, orderController.updateorder);

// Handle DELETE request to delete a order by ID
router.delete('/:id', isAuthenticated, orderController.deleteorder); 


module.exports = router;
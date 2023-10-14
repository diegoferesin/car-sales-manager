const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const Order = require('../models/orders');


//function to Get all orders
const getOrders = async (req, res) => {
    //#swagger.tags = ['Orders']
    console.log("Getting all the orders");
    Order.find().then(orders => {
        console.log('Orders found');
        res.status(200).json(orders);
    }
    ).catch(err => {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    });
};

//function to Get a order by ID
const getOrderById = async (req, res) => {
    //#swagger.tags = ['Orders']
    console.log("Validating orderID");
    if (!ObjectId.isValid(req.params.id)) {
        console.log("Must use a valid orderID to find a order.");
        return res.status(400).json({ message: "Must use a valid orderID to find a order." });
    }
    const orderID = req.params.id;
    console.log(`Getting order by ID: ${orderID}`);
    Order.findById(orderID)
        .then(order => {
            if (order) {
                console.log('Order found it:', order);
                return res.status(200).json(order);
            } else {
                console.log(`No order found with ID: ${orderID}`);
                return res.status(500).json({ message: `No order found with ID: ${orderID}` });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ message: err.message });
        });
};

//function to create a new order
const createOrder = async (req, res) => {
    //#swagger.tags = ['Orders']
    const { customerID, inventoryID, saleDate, dealership, price } = req.body;

    try {
        console.log(`Creating order with customerID: ${customerID}, inventoryID: ${inventoryID}, price: ${price}`);
        const order = new Order({
            customerID, inventoryID, saleDate, dealership, price
        });
        order.save().then((order) => {
            console.log();
            console.log('Order created successfully');
            console.log(`OrderID: ${order._id}`);
            console.log(`Price: ${order.price}`);
        })
        res.status(201).json(order);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};

//function to update a existing Order based on Order ID
const updateOrderById = async (req, res) => {
    //#swagger.tags = ['Orders']
    if (!ObjectId.isValid(req.params.id)) {
        console.log("Must use a valid orderID to update a customer.");
        return res.status(400).json({ message: "Must use a valid orderID to update a customer." });
    }

    let order = new Order({});
    order._id = req.params.id;

    const orderUpdated = validateAttributes(req, order);

    console.log(`Getting order for update with ID: ${order._id}`);
    Order.findByIdAndUpdate(order._id, orderUpdated, { new: true })
        .then(updatedOrder => {
            if (updatedOrder) {
                console.log('Order info updated: ', updatedOrder);
                return res.status(200).json(updatedOrder);
            } else {
                console.log(`No order found with ID: ${order._id} for update`);
                return res.status(400).json({ message: `No order found with ID: ${order._id} for update` });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(400).json({ message: err.message });
        });
};

// Function to delete a order by ID
const deleteOrderById = async (req, res) => {
    //#swagger.tags = ['Orders']
    if (!ObjectId.isValid(req.params.id)) {
        console.log("Must use a valid orderID to delete one.");
        return res.status(400).json({ message: "Must use a valid orderID to delete one." });
    }

    try {
        console.log(`Deleting order with ID: ${req.params.id}`);
        const orderID = req.params.id;
        const deletedOrder = await Order.findByIdAndRemove(orderID);
        if (deletedOrder == null || !deletedOrder) {
            if (deletedOrder == null) {
                console.log(`No order found with ID: ${orderID} for delete`);
                return res.status(404).json({ message: `No order found with ID: ${orderID} for delete` });;
            }
            console.log(deletedOrder);
            return res.status(404).json({ message: `No order found with ID: ${orderID} for delete` });;
        }

        console.log(`order with ID: ${orderID} was removed`)
        return res.status(204).send();
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
};

function validateAttributes(req, orderToUpdate) {

    if (req.body.customerID !== undefined && req.body.customerID !== '') {
        orderToUpdate.customerID = req.body.customerID;
    }

    if (req.body.inventoryID !== undefined && req.body.inventoryID !== '') {
        orderToUpdate.inventoryID = req.body.inventoryID;
    }


    if (req.body.saleDate !== undefined && req.body.saleDate !== '') {
        orderToUpdate.saleDate = req.body.saleDate;
    }


    if (req.body.dealership !== undefined && req.body.dealership !== '') {
        orderToUpdate.dealership = req.body.dealership;
    }


    if (req.body.price !== undefined && req.body.price !== '') {
        orderToUpdate.price = req.body.price;
    }

    return orderToUpdate;
}

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById
};
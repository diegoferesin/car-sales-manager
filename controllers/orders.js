const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


//function to Get all customers
const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('Orders').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists)
    });
}; 

//function to Get a customer by ID
const getSingle = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a Valid Order Id to find Order')
    }
    const OrderId1 = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Orders').find({_id: OrderId1});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0])
    });
}; 

//function to create a new customer
const createorder = async(req, res) => {
    const Order = {
        SaleID: req.body.SaleID, //REQUIRED ALL IDS
        InventoryID: req.body.InventoryID,
        CustomerID: req.body.CustomerID,
        Date: req.body.Date,
        Dealership: req.body.Dealership,
        Price: req.body.Price
        };
    const response = await mongodb.getDatabase().db().collection('Orders').insertOne(Order);
    if (response.acknowledged){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating new Order');
    }
};

//function to update a existing Order based on Order ID
const updateorder = async(req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a Valid Order Id when updating')
    }
    const OrderId = new ObjectId(req.params.id);
    const Order = {
        SaleID: req.body.SaleID,
        InventoryID: req.body.InventoryID,
        CustomerID: req.body.CustomerID,
        Date: req.body.Date,
        Dealership: req.body.Dealership,
        Price: req.body.Price
        };
    const response = await mongodb.getDatabase().db().collection('Orders').replaceOne({_id: OrderId}, Order);
    if (response.modifiedCount > 0 ){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating Order');
    }
};

// Function to delete a order by ID
const deleteorder = async (req, res) => {
    const studentId = new ObjectId(req.params.id);
    
    try {
        const response = await mongodb.getDatabase().db().collection('order').deleteOne({ _id: orderId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the order.", details: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createorder,
    updateorder,
    deleteorder
};
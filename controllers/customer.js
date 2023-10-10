const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


//function to Get all customers
const getAll = async (req, res) => {
    try {
    const result = await mongodb.getDatabase().db().collection('Customer').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists)
    });
} catch(err){
    res.json(err)
}
}; 

//function to Get a customer by ID
const getSingle = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a Valid Customer Id to find Customer')
    }
    const CustomerId1 = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Customers').find({_id: CustomerId1});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0])
    });
}; 

//function to create a new customer
const createcustomer = async(req, res) => {
    const Customer = {
        CustomerID: req.body.CustomerID,
        Username: req.body.Username,
        Password: req.body.Password,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Phone: req.body.Phone, 
        Address: req.body.Address,
        DateOfBirth: req.body.DateOfBirth 
        };
    const response = await mongodb.getDatabase().db().collection('Customers').insertOne(Customer);
    if (response.acknowledged){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating new Customer');
    }
};

//function to update a existing customer based on Customer ID
const updatecustomer = async(req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a Valid Customer Id when updating')
    }
    const CustomerId = new ObjectId(req.params.id);
    const Customer = {
        CustomerID: req.body.CustomerID,
        Username: req.body.Username,
        Password: req.body.Password,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Phone: req.body.Phone, 
        Address: req.body.Address,
        DateOfBirth: req.body.DateOfBirth 
        };
    const response = await mongodb.getDatabase().db().collection('Customers').replaceOne({_id: CustomerId}, Customer);
    if (response.modifiedCount > 0 ){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating Customer');
    }
};


// Function to delete a customer by ID
const deletecustomer = async (req, res) => {
    const studentId = new ObjectId(req.params.id);
    
    try {
        const response = await mongodb.getDatabase().db().collection('customer').deleteOne({ _id: customerId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the customer.", details: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createcustomer,
    updatecustomer,
    deletecustomer
};
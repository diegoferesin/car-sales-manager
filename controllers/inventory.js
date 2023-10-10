const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


//function to Get all Inventory
const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('Inventory').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists)
    });
}; 

//function to Get a Inventory by ID
const getSingle = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a Valid Inventory Id to find Item')
    }
    const InventoryID = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Inventory').find({_id: InventoryID});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0])
    });
}; 

//function to create a new inventory item
const createinventory = async(req, res) => {
    const Inventory = {
        InventoryID: req.body.InventoryID,
        Make: req.body.Make,
        Model: req.body.Model,
        Year: req.body.Year,
        Color: req.body.Color,
        Milage: req.body.Milage, 
        Price: req.body.Price
        };
    const response = await mongodb.getDatabase().db().collection('Inventory').insertOne(Inventory);
    if (response.acknowledged){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating new Inventory item');
    }
};

//function to update a existing Inventory based on Inventory ID
/* const updateinventory = async(req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a Valid Inventory Id when updating')
    }
    const InventoryId = new ObjectId(req.params.id);
    const Inventory = {
        InventoryID: req.body.InventoryID,
        Make: req.body.Make,
        Model: req.body.Model,
        Year: req.body.Year,
        Color: req.body.Color,
        Milage: req.body.Milage, 
        Price: req.body.Price
        };
    const response = await mongodb.getDatabase().db().collection('Inventory').replaceOne({_id: InventoryId}, Inventory);
    if (response.modifiedCount > 0 ){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating Inventory');
    }
}; */

// Function to delete a customer by ID
const deleteinventory = async (req, res) => {
    const studentId = new ObjectId(req.params.id);
    
    try {
        const response = await mongodb.getDatabase().db().collection('inventory').deleteOne({ _id: inventoryId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Inventory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the inventory.", details: error.message });
    }
};


module.exports = {
    getAll,
    getSingle,
    createinventory,
    updateinventory,
    deleteinventory
};
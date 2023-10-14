const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const Inventory = require('../models/inventory');


//function to Get all Inventory
const getInventory = async (req, res) => {
    //#swagger.tags = ['Inventory']
    console.log("Getting all the Inventory");
    Inventory.find().then(inventory => {
        console.log('Inventory found');
        res.status(200).json(inventory);
    }
    ).catch(err => {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    });
};

//function to Get a Inventory by ID
const getInventoryByID = async (req, res) => {
    //#swagger.tags = ['Inventory']
    console.log("Validating inventoryID");
    if (!ObjectId.isValid(req.params.id)) {
        console.log("Must use a valid inventoryID to find a inventory.");
        return res.status(400).json({ message: "Must use a valid inventoryID to find a inventory." });
    }
    const inventoryID = req.params.id;
    console.log(`Getting inventory by ID: ${inventoryID}`);
    Inventory.findById(inventoryID)
        .then(inventory => {
            if (inventory) {
                console.log('Inventory found it:', inventory);
                return res.status(200).json(inventory);
            } else {
                console.log(`No inventory found with ID: ${inventoryID}`);
                res.status(500).json({ message: `No inventory found with ID: ${dealershipID}` });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ message: err.message });
        });
};

//function to create a new inventory item
const createInventory = async (req, res) => {
    //#swagger.tags = ['Inventory']
    const { carMake, carModel, carYear, color, mileage, price } = req.body;

    try {
        console.log(`Creating inventory. Make: ${carMake}, model: ${carModel}, year: ${carYear}`);
        const inventory = new Inventory({
            carMake, carModel, carYear, color, mileage, price
        });
        inventory.save().then((inventory) => {
            console.log();
            console.log('Inventory created successfully');
            console.log(`InventoryID: ${inventory._id}`);
        })
        return res.status(201).json(inventory);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};

//function to update a existing Inventory based on Inventory ID
const updateInventoryById = async (req, res) => {
    //#swagger.tags = ['Inventory']
    if (!ObjectId.isValid(req.params.id)) {
        console.log("Must use a valid inventoryID to update a customer.");
        res.status(400).json({ message: "Must use a valid inventoryID to update a customer." });
    }

    let inventory = new Inventory({});
    inventory._id = req.params.id;

    const inventoryUpdated = validateAttributes(req, inventory);

    console.log(`Getting inventory for update with ID: ${inventory._id}`);
    Inventory.findByIdAndUpdate(inventory._id, inventoryUpdated, { new: true })
        .then(updatedInventory => {
            if (updatedInventory) {
                console.log('inventory info updated: ', updatedInventory);
                res.status(200).json(updatedInventory);
            } else {
                console.log(`No inventory found with ID: ${inventory._id} for update`);
                res.status(400).json({ message: `No inventory found with ID: ${inventory._id} for update` });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(400).json({ message: err.message });
        });
};

// Function to delete a inventory by ID
const deleteInventoryById = async (req, res) => {
    //#swagger.tags = ['Inventory']
    if (!ObjectId.isValid(req.params.id)) {
        console.log("Must use a valid inventoryID to delete one.");
        return res.status(400).json({ message: "Must use a valid inventoryID to delete one." });
    }

    try {
        console.log(`Deleting inventory with ID: ${req.params.id}`);
        const inventoryID = req.params.id;
        const deletedInventory = await Inventory.findByIdAndRemove(inventoryID);
        if (deletedInventory == null || !deletedInventory) {
            if (deletedInventory == null) {
                console.log(`No inventory found with ID: ${inventoryID} for delete`);
                return res.status(404).json({ message: `No inventory found with ID: ${inventoryID} for delete` });;
            }
            console.log(deletedInventory);
            return res.status(404).json({ message: `No inventory found with ID: ${inventoryID} for delete` });;
        }

        console.log(`Inventory with ID: ${inventoryID} was removed`)
        return res.status(204).send();
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
};

function validateAttributes(req, inventoryToUpdate) {

    if (req.body.carMake !== undefined && req.body.carMake !== '') {
        inventoryToUpdate.carMake = req.body.carMake;
    }

    if (req.body.carModel !== undefined && req.body.carModel !== '') {
        inventoryToUpdate.carModel = req.body.carModel;
    }

    if (req.body.carYear !== undefined && req.body.carYear !== '') {
        inventoryToUpdate.carYear = req.body.carYear;
    }

    if (req.body.color !== undefined && req.body.color !== '') {
        inventoryToUpdate.color = req.body.color;
    }

    if (req.body.mileage !== undefined && req.body.mileage !== '') {
        inventoryToUpdate.mileage = req.body.mileage;
    }

    if (req.body.price !== undefined && req.body.price !== '') {
        inventoryToUpdate.price = req.body.price;
    }

    return inventoryToUpdate;
}


module.exports = {
    getInventory,
    getInventoryByID,
    createInventory,
    updateInventoryById,
    deleteInventoryById
};
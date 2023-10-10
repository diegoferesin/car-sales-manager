const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


//function to Get all dealerships
const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('Dealership').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists)
    });
}; 

//function to Get a dealership by ID
const getSingle = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a Valid Dealership Id to find Dealership')
    }
    const DealershipId1 = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Dealership').find({_id: DealershipId1});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0])
    });
}; 

//function to create a new Dealership
const createdealership = async(req, res) => {
    const Dealership = {
        DealershipID: req.body.DealershipID,
        Name: req.body.Name,
        Location: req.body.Location,
        Email: req.body.Email,
        Phone: req.body.Phone, 
        Zipcode: req.body.Zipcode,
        };
    const response = await mongodb.getDatabase().db().collection('Dealership').insertOne(Dealership);
    if (response.acknowledged){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating new Dealership');
    }
};

//function to update a existing dealership based on ID
const updatedealership = async(req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a Valid Dealership Id when updating')
    }
    const DealershipId = new ObjectId(req.params.id);
    const Dealership = {
        DealershipID: req.body.DealershipID,
        Name: req.body.Name,
        Location: req.body.Location,
        Email: req.body.Email,
        Phone: req.body.Phone, 
        Zipcode: req.body.Zipcode,
        };
    const response = await mongodb.getDatabase().db().collection('Dealership').replaceOne({_id: DealershipId}, Dealership);
    if (response.modifiedCount > 0 ){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating Dealership');
    }
};



// Function to delete a dealership by ID
const deletedealership = async (req, res) => {
    const studentId = new ObjectId(req.params.id);
    
    try {
        const response = await mongodb.getDatabase().db().collection('dealership').deleteOne({ _id: dealershipId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'dealership not found' });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the dealership.", details: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createdealership,
    updatedealership,
    deletedealership
};
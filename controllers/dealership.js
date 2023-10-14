const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const Dealership = require('../models/dealership');


//function to Get all dealership
const getDealership = async (req, res) => {
    //#swagger.tags = ['Dealership']
    console.log("Getting all the dealership");
    Dealership.find().then(dealerships => {
        console.log('Dealerships found');
        res.status(200).json(dealerships);
    }
    ).catch(err => {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    });
};

//function to Get a dealership by ID
const getDealershipByID = async (req, res) => {
    //#swagger.tags = ['Dealership']
    console.log("Validating dealershipID");
    if (!ObjectId.isValid(req.params.id)) {
        console.log("Must use a valid dealershipID to find a dealership.");
        res.status(400).json({ message: "Must use a valid dealershipID to find a dealership." });
    }
    const dealershipID = req.params.id;
    console.log(`Getting dealership by ID: ${dealershipID}`);
    Dealership.findById(dealershipID)
        .then(dealership => {
            if (dealership) {
                console.log('Dealership found it:', dealership);
                res.status(200).json(dealership);
            } else {
                console.log(`No dealership found with ID: ${dealershipID}`);
                res.status(500).json({ message: `No dealership found with ID: ${dealershipID}` });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ message: err.message });
        });
};

//function to create a new dealership
const createDealership = async (req, res) => {
    //#swagger.tags = ['Dealership']
    const { name, location, phone, email, zipCode } = req.body;

    try {
        console.log(`Creating dealership with name: ${name}, location: ${location}, email: ${email}`);
        const dealership = new Dealership({
            name, location, phone, email, zipCode
        });
        const newDealership = dealership.save().then((dealership) => {
            console.log();
            console.log('Dealership created successfully');
            console.log(`DealershipID: ${dealership._id}`);
            console.log(`Location: ${dealership.location}`);
        })
        res.status(201).json(dealership);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};

//function to update a existing dealership based on Dealership ID
const updateDealershipById = async (req, res) => {
    //#swagger.tags = ['Dealership']
    if (!ObjectId.isValid(req.params.id)) {
        console.log("Must use a valid dealershipID to update a customer.");
        res.status(400).json({ message: "Must use a valid dealershipID to update a customer." });
    }

    let dealership = new Dealership({});
    dealership._id = req.params.id;

    const dealershipUpdated = validateAttributes(req, dealership);

    console.log(`Getting dealership for update with ID: ${dealership._id}`);
    Dealership.findByIdAndUpdate(dealership._id, dealershipUpdated, { new: true })
        .then(updatedDealership => {
            if (updatedDealership) {
                console.log('Dealership info updated: ', updatedDealership);
                res.status(200).json(updatedDealership);
            } else {
                console.log(`No dealership found with ID: ${dealership._id} for update`);
                res.status(400).json({ message: `No dealership found with ID: ${dealership._id} for update` });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(400).json({ message: err.message });
        });
};


// Function to delete a dealership by ID
const deleteDealershipByID = async (req, res) => {
    //#swagger.tags = ['Dealership']
    if (!ObjectId.isValid(req.params.id)) {
        console.log("Must use a valid dealershipID to delete one.");
        return res.status(400).json({ message: "Must use a valid dealershipID to delete one." });
    }

    try {
        console.log(`Deleting dealership with ID: ${req.params.id}`);
        const dealershipID = req.params.id;
        const deletedDealership = await Dealership.findByIdAndRemove(dealershipID);
        if (deletedDealership == null || !deletedDealership) {
            if (deletedDealership == null) {
                console.log(`No dealership found with ID: ${dealershipID} for delete`);
                return res.status(404).json({ message: `No dealership found with ID: ${dealershipID} for delete` });;
            }
            console.log(deletedDealership);
            return res.status(404).json({ message: `No dealership found with ID: ${dealershipID} for delete` });;
        }

        console.log(`Dealership with ID: ${dealershipID} was removed`)
        return res.status(204).send();
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
};

function validateAttributes(req, dealershipToUpdate) {

    if (req.body.name !== undefined && req.body.name !== '') {
        dealershipToUpdate.name = req.body.name;
    }

    if (req.body.location !== undefined && req.body.location !== '') {
        dealershipToUpdate.location = req.body.location;
    }

    if (req.body.phone !== undefined && req.body.phone !== '') {
        dealershipToUpdate.phone = req.body.phone;
    }

    if (req.body.email !== undefined && req.body.email !== '') {
        dealershipToUpdate.email = req.body.email;
    }

    if (req.body.zipCode !== undefined && req.body.zipCode !== '') {
        dealershipToUpdate.zipCode = req.body.zipCode;
    }

    return dealershipToUpdate;
}

module.exports = {
    getDealership,
    getDealershipByID,
    createDealership,
    updateDealershipById,
    deleteDealershipByID
};
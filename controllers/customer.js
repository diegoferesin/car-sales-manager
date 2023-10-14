const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const Customer = require('../models/customer');


//function to Get all customers
const getCustomers = async (req, res) => {
    //#swagger.tags = ['Customers']
    console.log("Getting all the customers");
    Customer.find().then(customers => {
        console.log('Customers found');
        res.status(200).json(customers);
    }
    ).catch(err => {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    });
};

//function to Get a customer by ID
const getCustomerByID = async (req, res) => {
    //#swagger.tags = ['Customers']
    console.log("Validating customerID");
    if (!ObjectId.isValid(req.params.id)) {
        console.log("Must use a valid customerID to find a customer.");
        res.status(400).json({ message: "Must use a valid customerID to find a customer." });
    }
    const customerID = req.params.id;
    console.log(`Getting customer by ID: ${customerID}`);
    Customer.findById(customerID)
        .then(customer => {
            if (customer) {
                console.log('Customer found it:', customer);
                res.status(200).json(customer);
            } else {
                console.log(`No student found with ID: ${customerID}`);
                res.status(500).json({ message: `No student found with ID: ${customerID}` });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ message: err.message });
        });
};

//function to create a new customer
const createCustomer = async (req, res) => {
    //#swagger.tags = ['Customers']
    const { customerID, username, password, firstName, lastName, email, phone, address, birthdate } = req.body;

    try {
        console.log(`Validating customer username: ${username}`);
        findCustomerByUsername(username).then((customer) => {
            if (customer) {
                console.log('Username already exists.');
                res.status(400).json({ message: 'Username already exists.' });
            } else {
                console.log(`Creating customer: Username: ${username}, First Name: ${firstName}, Last Name: ${lastName}`);
                const customer = new Customer({
                    customerID,
                    username,
                    password,
                    firstName,
                    lastName,
                    email,
                    phone,
                    address,
                    birthdate
                });
                const newCustomer = customer.save().then((customer) => {
                    console.log();
                    console.log('Customer created successfully');
                    console.log(`CustomerID: ${customer._id}`);
                    console.log(`Username: ${customer.username}`);
                })
                res.status(201).json(customer);
            }
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};

//function to update a existing customer based on Customer ID
const updateCustomer = async (req, res) => {
    //#swagger.tags = ['Customers']
    if (!ObjectId.isValid(req.params.id)) {
        console.log("Must use a valid customerID to update a customer.");
        res.status(400).json({ message: "Must use a valid customerID to update a customer." });
    }

    let customer = new Customer({});
    customer._id = req.params.id;

    const customerUpdated = validateAttributes(req, customer);

    console.log(`Getting customer for update with ID: ${customer._id}`);
    Customer.findByIdAndUpdate(customer._id, customerUpdated, { new: true })
        .then(updatedCustomer => {
            if (updatedCustomer) {
                console.log('Customer info updated: ', updatedCustomer);
                res.status(200).json(updatedCustomer);
            } else {
                console.log(`No customer found with ID: ${customer._id} for update`);
                res.status(400).json({ message: `No customer found with ID: ${customer._id} for update` });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(400).json({ message: err.message });
        });
};


// Function to delete a customer by ID
const deleteCustomerByID = async (req, res) => {
    //#swagger.tags = ['Customers']
    if (!ObjectId.isValid(req.params.id)) {
        console.log("Must use a valid customerID to delete one.");
        return res.status(400).json({ message: "Must use a valid customerID to delete one." });
    }

    try {
        console.log(`Deleting customer with ID: ${req.params.id}`);
        const customerID = req.params.id;
        const deletedCustomer = await Customer.findByIdAndRemove(customerID);
        if (deletedCustomer == null || !deletedCustomer) {
            if (deletedCustomer == null) {
                console.log(`No customer found with ID: ${customerID} for delete`);
                return res.status(404).json({ message: `No customer found with ID: ${customerID} for delete` });
            }
            console.log(deletedCustomer);
            return res.status(404).json({ message: `No customer found with ID: ${customerID} for delete` });;
        }

        console.log(`Customer with ID: ${customerID} was removed`)
        return res.status(204).send();
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
};

const findCustomerByUsername = async (username) => {
    try {
        const customer = await Customer.findOne({ username });
        return customer;
    } catch (error) {
        throw new Error('Fail finding customer by username: ' + error.message);
    }
};

function validateAttributes(req, customerToUpdate) {
    if (req.body.username !== undefined && req.body.username !== '') {
        customerToUpdate.username = req.body.username;
    }

    if (req.body.password !== undefined && req.body.password !== '') {
        customerToUpdate.password = req.body.password;
    }

    if (req.body.firstName !== undefined && req.body.firstName !== '') {
        customerToUpdate.firstName = req.body.firstName;
    }

    if (req.body.lastName !== undefined && req.body.lastName !== '') {
        customerToUpdate.lastName = req.body.lastName;
    }

    if (req.body.email !== undefined && req.body.email !== '') {
        customerToUpdate.email = req.body.email;
    }

    if (req.body.phone !== undefined && req.body.phone !== '') {
        customerToUpdate.phone = req.body.phone;
    }

    if (req.body.address !== undefined && req.body.address !== '') {
        customerToUpdate.address = req.body.address;
    }

    if (req.body.birthdate !== undefined && req.body.birthdate !== '') {
        customerToUpdate.birthdate = req.body.birthdate;
    }

    return customerToUpdate;
}

module.exports = {
    getCustomers,
    getCustomerByID,
    createCustomer,
    updateCustomer,
    deleteCustomerByID
};
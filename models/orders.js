const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    customerID: String,
    inventoryID: String,
    saleDate: String,
    dealership: String,
    price: String,
});

ordersSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Orders', ordersSchema, 'orders');
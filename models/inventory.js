const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    carMake: String,
    carModel: String,
    carYear: String,
    color: String,
    mileage: String,
    price: String,
});

inventorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Inventory', inventorySchema, 'inventory');
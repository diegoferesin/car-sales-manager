const mongoose = require('mongoose');

const dealershipSchema = new mongoose.Schema({
    name: String,
    location: String,
    phone: String,
    email: String,
    zipCode: String,
});

dealershipSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Dealership', dealershipSchema, 'dealership');
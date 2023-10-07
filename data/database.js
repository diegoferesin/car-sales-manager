const mongoConfig = require('../config/mongodb');
const mongoose = require('mongoose');

let database;

const initDb = (callback) => {
    if(database){
        console.log('Db has already been initialized!');
        return callback(null, database);
    } else {
        mongoose.connect(mongoConfig.url, mongoConfig.options)
        .then(() => {
            console.log('Db is connected!');
            database = mongoose.connection;
            callback(null, database);
        })
        .catch(err => {
            callback (err);
        });
    }
}

module.exports = {
    initDb
}
const mongoConfig = require('../config/mongodb');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db has already been initialized!');
        return callback(null, database);
    } else {
        console.log("Initializing database...");
        mongoose.connect(mongoConfig.url, mongoConfig.options)
            .then(() => {
                console.log('Db is connected!');
                database = mongoose.connection;
                return callback(null, database);
            })
            .catch(err => {
                callback(err);
            });
    }
}
const getDatabase = () => {
    if (!database) {
        throw Error('Database is not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
}
const express = require('express');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();

const mongodb = require('./data/database');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-Width, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

mongodb.initDb((err, db) => {
    try {
        app.listen(port, () => { console.log(`Server listening on port ${port}. Database is up`) });
    }
    catch (err) {
        console.log(err);
    }
});
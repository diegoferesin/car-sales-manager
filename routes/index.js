const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello team 1 and Hello World!');
});

router.use('/', require('./swagger'));

module.exports = router;
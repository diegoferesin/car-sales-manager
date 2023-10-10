const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello team 1 and Hello World!');
});

//REDIRECT TO OTHER FILES
router.use('/', require('./swagger'));
router.use('/customer', require('./customer'));
router.use('/dealership', require('./dealership'));
router.use('/inventory', require('./inventory'));
router.use('/orders', require('./orders'));

module.exports = router;
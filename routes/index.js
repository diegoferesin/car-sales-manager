const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
    //#swagger.tag=['Welcome']
    res.send('Hello Team 1 and Hello World!');
});

router.get('/logout-message', (req, res) => {
    res.send('Logged out');
});

router.get('/login', passport.authenticate('github', (req, res) => { }));

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/logout-message');
    });
});

//REDIRECT TO OTHER FILES
router.use('/', require('./swagger'));
router.use('/customer', require('./customer'));
router.use('/dealership', require('./dealership'));
router.use('/inventory', require('./inventory'));
router.use('/orders', require('./orders'));

module.exports = router;
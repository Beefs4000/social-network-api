const User = require('../models/user');

const router = require('express').Router();


router.get('/users', (req, res) => {

// Grab users
User.find({})
    .populate('thoughts')
    .populate('friends')
    .then((users) => {

        res.json(users);
    })

});




module.exports = router;
var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var Users = require('../models/user');

//Vendor Log in
router.post('/login', passport.authenticate('local', {
        successRedirect: '/#/vendor',
        failureRedirect: '/'
    })
);

//Vendor Register
router.post('/register', function(req,res,next) {
    console.log("New Registration:", req.body);
    Users.create(req.body, function (err, post) {
        if (err) next(err);
        else res.redirect('/users');
    })
});

//Catch-all
router.get("/*", function(req, res, next){
    var file = req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;
var express = require('express'),
    path = require('path'),
    passport = require('passport');

var router = express.Router();

//Models
var Users = require('../models/user');

//Vendor Log in
router.post('/login', passport.authenticate('local', {
        successRedirect: '/#/admin',
        failureRedirect: '/'
    })
);

//Vendor Register
router.post('/register', function(req, res, next) {
    console.log("New Registration:", req.body);
    Users.create(req.body, function (err, post) {
        if (err) next(err);
        else res.redirect('/');
    })
});

//Catch-all
router.get("/*", function(req, res){
    var file = req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;
var express = require('express'),
    path = require('path'),
    passport = require('passport');

var router = express.Router();

//Models
var Users = require('../models/user');

//Vendor Log in
router.post('/login', passport.authenticate('local'),
    function(req, res) {
        res.send(req.user);
    }
);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//Vendor Register
router.post('/register', function(req, res, next) {
    console.log("New Registration:", req.body.username);
    Users.create(req.body, function (err, user) {
        if (err) next(err);
        else res.send(user);
    })
});

//Get user info
router.get('/user', function(req, res) {
    res.send(req.isAuthenticated());
});

//Catch-all
router.get("/*", function(req, res){
    var file = req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;
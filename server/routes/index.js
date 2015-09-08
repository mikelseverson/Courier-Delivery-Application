var express = require('express'),
    path = require('path'),
    passport = require('passport');

var router = express.Router();

//Models
var Users = require('../models/user');

//Login
router.post('/login', passport.authenticate('local'),
    function(req, res) {
        res.send(req.user);
    }
);

//Logout
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//Register
router.post('/register', function(req, res, next) {
    console.log("New Registration:", req.body.username);
    Users.create(req.body, function (err, user) {
        if (err) next(err);
        else res.send(user);
    })
});

//Catch-all
router.get("/*", function(req, res){
    var file = req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;
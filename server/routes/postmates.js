var express = require('express'),
    path = require('path'),
    Postmates = require('postmates');

var pickup_name = "The Store";
var pickup_address = "310 Hennepin Ave E, Minneapolis, MN 55414";
var pickup_number = "000-000-0000";
var pickup_business_name = "";
var pickup_notes = "";

//Models
var Order = require('../models/order'),
    User = require('../models/user');

var postmates = new Postmates('cus_KKTBUzym9jC16k', '6854a484-6226-43b8-ab7f-0890841bee0a');
var router = express.Router();

//Query Postmates for delivery quote
router.post("/query", function(req, res) {
    if(!req.body.dropoff_address) {
        res.status(400).send("error: no dropoff_address");
    }
    else {
        //Create a record of the order
        var order = new Order({
            pickup_address: pickup_address,
            dropoff_address: req.body.dropoff_address
        });
        postmates.quote({
            dropoff_address: order.dropoff_address,
            pickup_address: order.pickup_address
        }, function(err, response) {
            if(err) {
                console.log(error);
                res.send(err);
            }
            order.quoteObject = response.body;
            order.save();
            res.send(order);
        });
    }
});

//Submit delivery to postmates
router.post("/create", function(req, res) {

    //Update our record of the order
    Order.findById(req.body._id, function(err, order) {
        order.pickup_name = pickup_name;
        order.pickup_phone_number = pickup_number;
        order.pickup_busines_name = pickup_business_name;
        order.pickup_notes = pickup_notes;
        order.dropoff_name = req.body.dropoff_name;
        order.dropoff_phone_number = req.body.dropoff_phone_number;
        order.dropoff_business_name = req.body.dropoff_business_name;
        order.dropoff_notes = req.body.dropoff_notes;
        order.save(function() {
            postmates.new({
                manifest: order.manifest,
                pickup_name: order.pickup_name,
                pickup_address: order.pickup_address,
                pickup_phone_number: order.pickup_phone_number,
                pickup_business_name: order.pickup_business_name,
                pickup_notes: order.pickup_notes,
                dropoff_name: order.dropoff_name,
                dropoff_address: order.dropoff_address,
                dropoff_phone_number: order.dropoff_phone_number,
                dropoff_business_name: order.dropoff_business_name,
                dropoff_notes: order.dropoff_notes,
                quote_id: order.quoteObject.id
            }, function(err, response) {
                if(err) {
                    console.log(err);
                    res.send(err);
                }
                order.deliveryObject = JSON.parse(response.text);
                if(req.user) {
                    req.user.orders.push(order);
                    req.user.save();
                }
                order.save();
                res.send(order);
            });
        });
    });
});

//update all orders attached to user
router.post("/update", function(req, res) {
    if(req.isAuthenticated()) {
        User.findById(req.user._id, function(err, user) {
            if(err) {
                console.log(err);
                res.send(err);
            }
            else {
                console.log(user.orders.id(req.body.id));
                for(var i = 0; i < user.orders.length; i++) {
                    console.log(user.orders[0].deliveryObject);
                    postmates.get(user.orders[0].deliveryObject.id, function(err, response) {
                        user.orders[i].deliveryObject = response.body;
                        user.save();
                        res.send("updated");
                    });

                }
                console.log(user.orders);
                console.log(user.orders[0].deliveryObject);
                postmates.get(order.deliveryObject.id, function(err, response) {
                    order.deliveryObject = response.body;
                    user.save();
                    res.send("updated");
                });
            }
        })
    }
});

//Get all deliveries
router.get("/deliveries", function(req, res) {
    postmates.list(function(err, response) {
        if(response.body == undefined) {
            res.send("error");
        }
        res.send(response.body);
    });
});

module.exports = router;
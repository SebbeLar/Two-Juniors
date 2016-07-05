var express = require('express'),
    jwt = require('jsonwebtoken'),
    config = require('../config'),
    User = require('../models/user-model'),
    router = express.Router();

router.use(function(req, res, next) {

    var token = req.cookies.sessionToken; 
    if (token) {

    // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
        // if everything is good, save to request for use in other routes
                req.decoded = decoded;    
                next();
            }
        });

    } else {

    // if there is no token
    // return an error
    // TODO fix Redirect and message
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    
    }
});

router.get('/auth', function(req, res) {
    User.findOne({
        username: 'smar777'
    }, function(err, user) {
       /* console.log(user);
        user.comparePassword('Password123', function(err, isMatch) {
            if(err) {
                console.log('wrong: ' + err);
            } 
            console.log(isMatch);
        });
        */
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

      // check if password matches
           // if (user.password != 'Password123') {
              //  res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            //} else {

        // if user is found and password is right
        // create a token
                var token = jwt.sign(user, config.secret, {
                    expiresIn: '2 days' // expires in 24 hours
                });

        // return the information including token as JSON
                res.cookie('sessionToken', token);
                res.send('You got a cookie!');
            //}   

        }

    });
});

router.get('/', function(req, res) {
    res.send('This is the API page Wohoo!');
});

router.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.send(users);
    });
});



module.exports = router;
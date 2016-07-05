var express = require('express'),
    jwt = require('jsonwebtoken'),
    config = require('../config'),
    User = require('../models/user-model'),
    router = express.Router();

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  //var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var token = req.cookies.sessionToken; 
  // decode token
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
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    
    }
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
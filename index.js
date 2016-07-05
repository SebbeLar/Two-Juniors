var mongoose = require('mongoose'),
    express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    jwt = require('jsonwebtoken'),
    cookieParser = require('cookie-parser'),
    config = require('./config'),
    User = require('./models/user-model'),
    AuthRoutes = require('./routes/auth-routes.js'),
    app = express();

var port = process.env.PORT || 8083;
mongoose.connect(config.database);
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.send('Hello from Auth testing!');
});




app.use('/api', AuthRoutes);

app.listen(port, function() {
    console.log('Magic happening on port: ' + port);
});
/*

// create a user a new user
var testUser = new User({
    username: 'smar777',
    password: 'Password123'
});

// save user to database
testUser.save(function(err) {
    if (err) throw err;

    // fetch user and test password verification
    User.findOne({ username: 'smar777' }, function(err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword('Password123', function(err, isMatch) {
            if (err) throw err;
            console.log('Password123:', isMatch); // -> Password123: true
        });

        // test a failing password
        user.comparePassword('123Password', function(err, isMatch) {
            if (err) throw err;
            console.log('123Password:', isMatch); // -> 123Password: false
        });
    });
});
*/
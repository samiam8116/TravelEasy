var express = require('express');
var router = express.Router();

// New stuff
var env = require('dotenv').config();
const Client = require('pg').Client;
const client = new Client({
  connectionString: process.env.DATABASE_URL
});
client.connect(); //connect to database

var passport = require('passport');
var bcrypt = require('bcryptjs');
// new stuff ends here

// modify this module
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('user', { user: req.user }); //display user.hbs
});

// new stuff again
router.get('/logout', function(req, res){
    req.logout(); //passport provide it
    res.redirect('/home'); // Successful. redirect to localhost:3000/users
});

function loggedIn(req, res, next) {
  if (req.user) {
    next(); // req.user exists, go to the next function (right after loggedIn)
  } else {
    res.redirect('/users/login'); // user doesn't exists redirect to localhost:3000/users/login
  }
}

router.get('/profile',loggedIn, function(req, res){
      // req.user: passport middleware adds "user" object to HTTP req object
      res.render('profile', { person: req.user });
});

router.get('/dash', loggedIn, function(req, res){
  res.render('dash', {person: req.user});
});

function notLoggedIn(req, res, next) {
  if (!req.user) {
    next();
  } else {
    res.redirect('/users/profile');
  }
}

router.get('/login', notLoggedIn, function(req, res){
    //success is set true in sign up page
    //req.flash('error') is mapped to 'message' from passport middleware
    res.render('login', {success:req.query.success, errorMessage: req.flash('error')});
});

router.post('/login',
  // This is where authentication happens - app.js
  // authentication locally (not using passport-google, passport-twitter, passport-github...)
  passport.authenticate('local', { failureRedirect: 'login', failureFlash:true }),
  function(req, res,next) {
    res.redirect('/users/profile'); // Successful. redirect to localhost:3000/users/profile
});

router.get('/addToDo',function(req, res, next) {
  res.render('addToDo', {user: req.user, error: req.flash('error')});

});

router.post('/addToDo',function(req, res, next) {
client.query('SELECT * FROM users WHERE username = $1', [req.body.username], function(err, result) {
  if (err) {
  console.log("unable to query SELECT");
  next(err);
  }
  if (result.rows.length > 0) {
      console.log("user exist");
      client.query('INSERT INTO assignment (username, description, due) VALUES($1, $2, $3)', [req.body.username, req.body.description,req.body.due], function(err, result) {
          if (err) {
          console.log("unable to query INSERT");
          next(err);
      }
      console.log("To Do creation is successful");
      res.render('addToDo', {user: req.user , success: "true" });
      });
  }
  else if (result.rows.length <= 0){
  console.log("User does not exist");
  res.render('addToDo', {error: "Username does not exist"});
  }
});
});

router.get('/signup',function(req, res) {
    // If logged in, go to profile page
    if(req.user) { // if logs in
      return res.redirect('/users/profile');
    }
    res.render('signup'); // signup.hbs
});
// check if username has spaces, DB will whine about that
function validUsername(username) {
  var login = username.trim(); // remove spaces
  return login !== '' && login.search(/ /) < 0;
}

function createUser(req, res, next){
  var salt = bcrypt.genSaltSync(10);
  var pwd = bcrypt.hashSync(req.body.password, salt);

  client.query('INSERT INTO users (username, password) VALUES($1, $2)', [req.body.username, pwd], function(err, result) {
    if (err) {
      console.log("unable to query INSERT");
      return next(err); // throw error to error.hbs.
    }
    console.log("User creation is successful");
    res.redirect('/users/login?success=true');
  });
}

router.post('/signup', function(req, res, next) {
  // Reject users
  if (!validUsername(req.body.username)) {
    return res.render('signup');
  }

  if (req.body.password !== req.body.password2){
    console.log("no match");
    res.render('signup', { errorMessage: "true"});
  }

  client.query('SELECT * FROM users WHERE username=$1',[req.body.username], function(err,result){
    if (err) {
      console.log("sql error ");
      next(err); // throw error to error.hbs.
    }
    else if (result.rows.length > 0) {
      console.log("user exists");
      res.render('signup', { errorMessage: "true" });
    }
    else {
      console.log("no user with that name");
      createUser(req, res, next);
    }
  });
});
// new stuff ends here

module.exports = router;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

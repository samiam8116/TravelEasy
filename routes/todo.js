var express = require('express');
var router = express.Router();

/*GET home page. */

router.get('/', function(req, res, next) {
  res.render('todo', { title: 'Travel Easy' });
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



module.exports = router;

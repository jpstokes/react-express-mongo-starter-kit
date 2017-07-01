var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/api/v1/users', function(req, res, next) {
  var collection = db.get('users');
  collection.find({}, {}, (e, docs) => {
      res.json(docs);
  });
});

/* GET users listing. */
router.put('/api/v1/users/:userId', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');

  // Set our collection
  var collection = db.get('users');

  // Submit to the DB
  collection.insert(req.body, (err, doc) => {
    if (err) {
        // If it failed, return error
        res.send("There was a problem adding the information to the database.");
    }
    else {
        // And forward to success page
        res.json(db.users.findOne( {$query:{}, $orderby:{$natural:-1}} ));
    }
  });
});

/* GET users listing. */
router.post('/api/v1/users', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');

  // Set our collection
  var collection = db.get('users');

  // Submit to the DB
  collection.insert(req.body, (err, doc) => {
    if (err) {
        // If it failed, return error
        res.send("There was a problem adding the information to the database.");
    }
    else {
        // And forward to success page
        res.json(db.users.findOne( {$query:{}, $orderby:{$natural:-1}} ));
    }
  });
});

/* GET users listing. */
router.delete('/api/v1/users/:userId', function(req, res, next) {
  var collection = db.get('users');
  collection.remove({ _id: req.params.userId }, (e, docs) => {
      res.sendStatus(200);
  });
});

module.exports = router;

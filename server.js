const express = require('express');
const path = require('path');
const app = express();
var mongo = require('mongodb');
var mongoDB = 'mongodb://localhost/blackbusinessfinder';
var monk = require('monk');
var db = monk(mongoDB);
const bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

/* GET users listing. */
app.get('/api/v1/users', function(req, res, next) {
  var collection = db.get('users');
  collection.find({}, {}, (e, docs) => {
      console.log('users', docs)
      res.status(200).json(docs);
  });
});

/* GET users listing. */
app.post('/api/v1/users', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');

  console.log('request', req.body)

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
        res.redirect("/");
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(3001, function() {
  console.log('listening on 3001')
})

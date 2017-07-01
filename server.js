require('dotenv').config()

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const port = process.env.PORT || 3001

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

// routes
app.use('/', userRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, function() {
  console.log(`listening on ${port}`)
})

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', userRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(3001, function() {
  console.log('listening on 3001')
})

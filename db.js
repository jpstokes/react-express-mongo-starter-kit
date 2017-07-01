var mongo = require('mongodb');
var monk = require('monk');

var mongoDB = process.env.MONGODB_URI;

module.exports = monk(mongoDB);

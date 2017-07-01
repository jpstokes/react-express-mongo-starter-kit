var mongo = require('mongodb');
var mongoDB = 'mongodb://localhost/blackbusinessfinder';
var monk = require('monk');

module.exports = monk(mongoDB);

var mongo = require('mongodb');
var monk = require('monk');

var mongoDB = process.env.MONGO_DB;
console.log(mongoDB);

module.exports = monk(mongoDB);

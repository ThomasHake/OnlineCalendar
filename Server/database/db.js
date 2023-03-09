const Datastore = require('nedb');
const path = require('path');
const { promisify } = require('util');

const db = {};

db.authentication = new Datastore(path.join(__dirname, 'authentication.db'));
db.authentication.loadDatabase();

db.authentication.findOnePromise = promisify(db.authentication.findOne);
db.authentication.insertPromise = promisify(db.authentication.insert);


db.events = new Datastore(path.join(__dirname, 'events.db'));
db.events.loadDatabase();

db.events.findPromise = promisify(db.events.find);
db.events.insertPromise = promisify(db.events.insert);
db.events.removePromise = promisify(db.events.remove);
db.events.updatePromise = promisify(db.events.update);


module.exports = db;

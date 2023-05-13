//const Datastore = require('nedb');
const path = require('path');
const { promisify } = require('util');
const mongoose = require("mongoose")
const MongoClient = require('mongodb').MongoClient;
const Event = require("./db-model-events")
require('dotenv').config();


mongoose.connect(process.env.MONGODB_EVENTS_CONNECTION_STRING)	// mongoose auto handals async and await
.then(() => {
	console.log("Connected to Atlas")
	//const db = client.db{'project0?'}
	//const taskCollection = db.collection{}
}).catch((err) => {
	console.log(err);
	});


Event.findPromise = promisify(Event.find);
Event.insertPromise = promisify((event)=>{
	new Event( event ).save();
});
Event.removePromise = promisify(Event.findOneAndRemove);
Event.updatePromise = promisify(Event.findByIdAndUpdate);




module.exports = Event;





/*
MongoClient.connect(process.env.MONGODB_EVENTS_CONNECTION_STRING)
.then(client => {
	console.log('connected to database');
	const db = client.db('Project0');
	const events = db.collection('events')
	
	db.events.findPromise = promisify(events.find);
	db.events.insertPromise = promisify(events.insert);
	db.events.removePromise = promisify(events.remove);
	db.events.updatePromise = promisify(events.update);

})

module.exports = db;


------------------------------------------------


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('dotenv').config();


mongoose.connect(process.env.MONGODB_EVENTS_CONNECTION_STRING)
	.then(() => {
	console.log("Connected to Atlas")
	const db = client.db{'project0?'}
	const taskCollection = db.collection{}
	})
	.catch((err) => {
	console.log(err);
	});

const eventSchema = new Schema({
						id: String,
						title: String,	
						from: Object,		
						to: Object,	
						description: String,		
						location: String,	
						color: String,	
						colorText: String,		
						colorBorder	: String,	
						isAllDay: Boolean,		
						repeatEvery	: Number,	
						repeatEveryExcludeDays: [Number],	
						seriesIgnoreDates: [Object],		
						created: Object,	
						organizerName: String,		
						organizerEmailAddress: String,		
						repeatEnds: Object,		
						group: String,		
						url: String,		
						repeatEveryCustomType: Number,		
						repeatEveryCustomValue: Number,		
						lastUpdated: Object,		
						showAlerts: Boolean,		
						locked: Boolean,		
});

//const Event = mongoose.model('event', eventSchema);

const db = {};

db.events = mongoose.model('event', eventSchema);

db.events.findPromise = promisify(db.events.find);
db.events.insertPromise = promisify(new db.events.save);
db.events.removePromise = promisify(db.events.remove);
db.events.updatePromise = promisify(db.events.update);



*/
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var os = require('os');
const Event = require("./db-model-events")
const mongoose = require('mongoose')


//pass in db.events
//const createEventsService = (db) => {
const createEventsService = () => {
	eventService = {};
	
	eventService.getAll = async function() {
		//return db.findPromise({})
		const events = await Event.find({})
		.then(function(MongooseData) { 
			const events = [];
			let temp = JSON.stringify(MongooseData);
			let data = JSON.parse(temp);
			data.forEach((data) => {
				const {_id, ...event} = data;
				events.push(event);
			});
			return events;
		});
		return events
	}
	
	eventService.post = (req) => {
		//return db.insertPromise(event)
		const event = new Event( req );
		return event.save()
		.catch((err) => console.log(err));
	}
	
	eventService.delete = (eventId) => {
		//return db.removePromise({id: eventId}, {})
		return Event.deleteOne({id: eventId})
		.catch((err) => console.log(err));
	}
	
	eventService.update = (event) => {
		//return db.updatePromise({id: event.id}, {$set: event}, {})
		return Event.updateOne({id: event.id}, event)		
		.catch((err) => console.log(err));
	}
	return eventService;
}

module.exports = createEventsService;
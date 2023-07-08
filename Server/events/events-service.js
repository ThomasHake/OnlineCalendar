const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var os = require('os');
const Event = require("./db-model-events")
const mongoose = require('mongoose')


const createEventsService = () => {
	eventService = {};
	
	eventService.getAll = async function() {
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
		const event = new Event( req );
		return event.save()
		.catch((err) => console.log(err));
	}
	
	eventService.delete = (eventId) => {
		return Event.deleteOne({id: eventId})
		.catch((err) => console.log(err));
	}
	
	eventService.update = (event) => {
		return Event.updateOne({id: event.id}, event)		
		.catch((err) => console.log(err));
	}
	return eventService;
}

module.exports = createEventsService;
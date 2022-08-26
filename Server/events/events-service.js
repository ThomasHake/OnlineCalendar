const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//pass in db.events
const createEventsService = (db) => {
	eventService = {};
	
	eventService.getAll = () => {
		return db.findPromise({})
			.then((data) => {
			const events = [];
			data.forEach((event) => {
				const {_id, ...rest} = event;
				events.push(rest);
			});
			return events;
		});
	}
	
	eventService.post = (event) => {
		return db.insertPromise(event)
		.catch((err) => console.log(err));
	}
	
	eventService.delete = (eventId) => {
		return db.removePromise({id: eventId}, {})
		.catch((err) => console.log(err));
	}
	
	eventService.update = (event) => {
		return db.updatePromise({id: event.id}, {$set: event}, {})
		.catch((err) => console.log(err));
	}
	return eventService;
}

module.exports = createEventsService;
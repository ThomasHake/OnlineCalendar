const express = require('express');	
const server = express();				
const path = require('path');
const Datastore = require('nedb')

server.use(express.static(path.join(__dirname, '..', 'Client')));
server.use(express.json({limit: '1mb'}));      


const db = {};
db.events = new Datastore('events.db');
db.events.loadDatabase();

//send all events
server.get('/calendarjs/events/all', (req, res) => {
	db.events.find({}, (err, data) => {
		if (err) throw err;
		const events = [];
		data.forEach((event) => {
			const {_id,...rest} = event;
			events.push(rest);
		});
		res.json(events);
	});
});


//post test
server.post('/calendarjs/events', (req, res) => {
	console.log(req.body);
	db.events.insert(req.body);
	res.end();
});
//delete test
server.delete('/calendarjs/events', (req, res) => {
	console.log(req.body);
	db.events.remove({id:req.body.id}, {}, (err, numRemoved) => {
		if (err) {
			console.log(err);
		}
	});
	res.end();
});
//update test
server.put('/calendarjs/events', (req, res) => {
	console.log(req.body);
	db.events.update({id: req.body.id}, {$set: req.body}, {}, (err, numUpdated) => {
		if (err){
			console.log(err);
		}
	});
	res.end();
});




const port = process.env.PORT || 3000;
server.listen(port, '127.0.0.1', () => console.log(`listening on ${port}`));
//server.listen(port, '0.0.0.0', () => console.log(`listening on ${port}`));





/*

cd Desktop\Projects\HTML\OnlineCalander\Server
set PORT=5000
ipconfig/all

*/
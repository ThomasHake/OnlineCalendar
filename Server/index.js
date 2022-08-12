const express = require('express');	
const server = express();				
const path = require('path');
const Datastore = require('nedb')
//const fs = require('fs');
//const cors = require('cors');    	

//server.use(cors({origin:'*'}))

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


const port = process.env.PORT || 3000;
server.listen(port, '127.0.0.1', () => console.log(`listening on ${port}`));
//server.listen(port, '0.0.0.0', () => console.log(`listening on ${port}`));





/*

cd Desktop\Projects\HTML\OnlineCalander\Server
set PORT=5000
ipconfig/all

*/
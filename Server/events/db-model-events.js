const mongoose = require("mongoose")
require('dotenv').config();

const eventSchema = new mongoose.Schema({
						id: {type: String, index: true},
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

//Event = mongoose.model("Event", eventSchema)

mongoose.connect(process.env.MONGODB_EVENTS_CONNECTION_STRING)	// mongoose auto handals async and await
.then(() => {
	console.log("Connected to Atlas")
	//const db = client.db{'project0?'}
	//const taskCollection = db.collection{}
}).catch((err) => {
	console.log(err);
	});

module.exports = mongoose.model("Event", eventSchema)

//module.exports = Event
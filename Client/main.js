import {calendarJs} from "./Calendar.js/src/calendarjs.js";

function addEvent(event){
	fetch('/calendarjs/events', {method: 'POST',
      		headers: {
        	'Accept': 'application/json',
        	'Content-Type': 'application/json',
      		},
      		body: JSON.stringify(event)
    	});
}

function removeEvent(event){
	fetch('/calendarjs/events', {method: 'DELETE',
      		headers: {
        	'Accept': 'application/json',
        	'Content-Type': 'application/json',
      		},
      		body: JSON.stringify(event)
    	});
}

function updateEvent(event){
	fetch('/calendarjs/events', {method: 'PUT',
      		headers: {
        	'Accept': 'application/json',
        	'Content-Type': 'application/json',
      		},
      		body: JSON.stringify(event)
    	});
}


// calendarJs(id, options, startDateTime)
var calendarInstance = new calendarJs( "myCalendar", { 
            exportEventsEnabled: false,
            manualEditingEnabled: true,
            showTimesInMainCalendarEvents: false,
            minimumDayHeight: 0,
            organizerName: "",
            organizerEmailAddress: "your@email.address",
            visibleDays: [ 0, 1, 2, 3, 4, 5, 6 ],
			onEventAdded: addEvent,
			onEventRemoved: removeEvent,
			onEventUpdated: updateEvent,
            })

fetch('/calendarjs/events/all')
			.then((response) => response.json())
			.then((events) => calendarInstance.setEvents(events));
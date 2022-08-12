import {calendarJs} from "Calendar.js-main/src/calendarjs.js";



// calendarJs(id, options, startDateTime)
var calendarInstance = new calendarJs( "myCalendar", { 
            exportEventsEnabled: false,
            manualEditingEnabled: true,
            showTimesInMainCalendarEvents: false,
            minimumDayHeight: 0,
            organizerName: "",
            organizerEmailAddress: "your@email.address",
            visibleDays: [ 0, 1, 2, 3, 4, 5, 6 ],
            });
# OnlineCalender

## Uses Nodejs to add a back end to an entirly front end calendar made here: https://github.com/williamtroup/Calendar.js/blob/main/OPTIONS.md

The server side code includes a system for authorization and a system for storing events in a seperate mongoDB Server. 
This project also has some front end code (javascript and css) in order to add a password input section to the calendar module that it is working with


## how to use 

* make the file "Server/.env" and fill it with:
		ACCESS_TOKEN_SECRET=password1
		REFRESH_TOKEN_SECRET=password2
		AUTHENTICATION_PASSWORD=
		MONGODB_EVENTS_CONNECTION_STRING=
		ATHENTICATION_DURATION=3600000

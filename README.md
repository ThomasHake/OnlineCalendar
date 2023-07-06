# OnlineCalender

## Uses Nodejs to add a back end to an entirly front end calendar made here:
https://github.com/williamtroup/Calendar.js/blob/main

The server side code includes a system for authorization and a system for storing events in a seperate mongoDB Server. 
This project also has some front end code (javascript and css) in order to add a password input section to the calendar module that it is working with


## how to use 
git clone https://github.com/ThomasHake/OnlineCalendar.git		#copies all my code into new folder  
  
* make the file "Server/.env" in the new folder and add variables:  
SALT_ROUNDS=10  
ATHENTICATION_DURATION=3600000  
ACCESS_TOKEN_SECRET=<input_password1>  
REFRESH_TOKEN_SECRET=<input_password2>  
MONGODB_EVENTS_CONNECTION_STRING=<connection_String>  
AUTHENTICATION_PASSWORD=<leave_blank>  
AUTHENTICATION_PASSWORD_PLAIN_TEXT=<plain text password (deleted after first run)>  
  
cd OnlineCalendar  
git submodule update --init  		#copies code from my fork of front end calendar module into folder  
cd Server  
nodemon index.js				#starts Server  
  
you can now open LocalHost:3000 in web browser to see calendar  




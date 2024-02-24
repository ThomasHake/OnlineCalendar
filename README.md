# OnlineCalender

## Uses Nodejs to add a back end to an entirly front end calendar  
front end calendar here: https://github.com/williamtroup/Calendar.js/blob/main  
  
The server side code includes a system for authorization and a system for storing events in an Atlus MongoDB Server. 
This project also has some front end code (javascript and css) in order to add a password input section to the calendar module that it is working with  

There currently is an instance of this code on a singal board computer running linux and using residential internet here: https://thomashake.ddns.net  


## How to use 
git clone https://github.com/ThomasHake/OnlineCalendar.git		#copies the code into a new folder  
cd OnlineCalendar  
git submodule update --init  		#copies code from my fork of the front end calendar module into folder  
cd Server  
npm install


* make the file ".env" in the Server Directory and fill it with:  
SALT_ROUNDS=10  
ATHENTICATION_DURATION=3600000  
ACCESS_TOKEN_SECRET=	<input_secret(8 random alpha-numeric characters)>  
MONGODB_EVENTS_CONNECTION_STRING=	<connection_String>  
AUTHENTICATION_PASSWORD=	<leave_blank>  
PASSWORD_PLAIN_TEXT=	<plain text password (deleted after first run)>  
  
  
nodemon index.js				#starts Server  
  
you can now open LocalHost:3210 in any web browser to see the calendar  




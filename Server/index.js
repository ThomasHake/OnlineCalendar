const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const createEventRouter = require('./events/events-router');
const createAuthenticationRouter = require('./authentication/auth-router');
const Router = express.Router;
const server = express();
 

server.use(express.static(path.join(__dirname, '..', 'Client')));
server.use(express.json({limit: '1mb'}));   
server.use(cookieParser());

authenticationRouter = createAuthenticationRouter();
eventRouter = createEventRouter();

server.use('/authentication', authenticationRouter);
server.use('/events', eventRouter); 


const port = process.env.PORT || 3210;
server.listen(port, 'localhost', () => console.log(`listening on ${port}`)); //Localhost
//server.listen(port, '0.0.0.0', () => console.log(`listening on ${port}`)); //All Interfaces

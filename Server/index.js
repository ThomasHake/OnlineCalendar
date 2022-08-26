const express = require('express');
const path = require('path');
const eventRouter = require('./events/events-router');
const authenticationRouter = require('./authentication/authentication-router');
const server = new express();

server.use(express.static(path.join(__dirname, '..', 'Client')));
server.use(express.json({limit: '1mb'}));      

server.use('/calendarjs', eventRouter);
server.use('/authentication', authenticationRouter);


const port = process.env.PORT || 3000;
server.listen(port, '127.0.0.1', () => console.log(`listening on ${port}`));
//server.listen(port, '0.0.0.0', () => console.log(`listening on ${port}`));

const Router = require('express').Router;
const loginRouter = require('./login-router');
//const eventsRouter = require('./events-router');
console.log('here ' + loginRouter)

Router.use('/login', loginRouter);
//Router.use('/events', eventsRouter);

module.exports = Router;

//dead
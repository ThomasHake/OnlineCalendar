const Router = require('express').Router;
const createEventsController = require('./events-controller');
const createEventsService = require('./events-service');
const db = require('../database/db');


const eventsService = createEventsService(db.events);
const eventsController = createEventsController(eventService);

const eventsRouter = new Router();

eventsRouter.get('/events/all', eventsController.getAll);
eventsRouter.post('/events', eventsController.post);
eventsRouter.delete('/events', eventsController.delete);
eventsRouter.put('/events', eventsController.update);


module.exports = eventsRouter;

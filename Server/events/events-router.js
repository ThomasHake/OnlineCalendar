const Router = require('express').Router;
const createEventsController = require('./events-controller');
const createEventsService = require('./events-service');
const db = require('../database/db');
const checkToken = require('../authentication/auth-mid-checkToken');


function createEventsRouter(authenticaitonRouter){

	const eventsService = createEventsService(db.events);
	const eventsController = createEventsController(eventService);

	const eventsRouter = new Router();

	eventsRouter.get('/events/all', eventsController.getAll);
	eventsRouter.post('/events', checkToken, eventsController.post);
	eventsRouter.delete('/events', checkToken, eventsController.delete);
	eventsRouter.put('/events', checkToken, eventsController.update);

	return eventsRouter;
}

module.exports = createEventsRouter;

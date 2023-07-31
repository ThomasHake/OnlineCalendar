const Router = require('express').Router;
const createEventsController = require('./events-controller');
const createEventsService = require('./events-service');
const checkToken = require('../authentication/auth-mid-checkToken');


function createEventsRouter(authenticaitonRouter){

	const eventsService = createEventsService();
	const eventsController = createEventsController(eventService);

	const eventsRouter = new Router();
	
	eventsRouter.get('/crud', eventsController.getAll);
	eventsRouter.post('/crud', checkToken, eventsController.post);
	eventsRouter.delete('/crud', checkToken, eventsController.delete);
	eventsRouter.put('/crud', checkToken, eventsController.update);

	return eventsRouter;
}

module.exports = createEventsRouter;

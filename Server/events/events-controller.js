const createEventsController = (eventsService) => {
	const eventsController = {};
	
	eventsController.getAll = (req, res, next) => {
		eventsService.getAll(req.body)
			.then((events) => {
				res.status(200);		//combine
				res.send(events);		//combine
		})
		.catch((err) => {
			res.status(400);
			res.send({ ok: false, error: err.message});
		});
	};
	
	eventsController.post = (req, res, next) => {
		eventsService
			.post(req.body)
			.then(() => res.end())
			.catch((err) => {
				res.status(401);
				res.send({ ok: false, error: err.message });
		});	};
	
	eventsController.delete = (req, res, next) => {
		eventsService
			.delete(req.body.id)
			.then(() => res.status(200).end())
			.catch((err) => {
				res.status(401);
				res.send({ ok: false, error: err.message });
			});	
	};
	
	eventsController.update = (req, res, next) => {
		eventsService
			.update(req.body)
			.then(() => res.status(200).end())
		.catch((err) => {
			res.status(401).send({ ok: false, error: err.message });
		});	
	};
	return eventsController;
};

module.exports = createEventsController;

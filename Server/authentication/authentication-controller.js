const createAuthenticationController = (authenticationService) => {
	const authenticationController = {};
	
	authenticationController.register = (req, res, next) => {	//service.register to promise
		console.log('req.body: ', req.body);
		authenticationService
			.register(req.body.password)
			.then((doc) => {
				console.log('controller register doc: ', doc);
				res.status(200).end();
			})
			.catch((err) => {
				res.status(400).send({ ok: false, error: err.message });
			});
	};
	
	authenticationController.authenticate = (req, res, next) => {
		authenticationService
			.authenticate(req.body.password)
			.then((token) => {
				res.status(200);
				res.send({ ok: true, token });
			})
			.catch((err) => {
				console.log(err.message)
				res.status(401)
				res.send({ ok: false, error: err.message });
		});
	};
	
	
	authenticationController.checkToken = (req, res, next) => {
		authenticationService.checkToken(req.query.token, (err, data) => {         //insecure: use authorization header not query paramater
			if (err) {
				res.status(401).send({ ok : false, error: err });
			} else {
				res.status(200).send({ ok: true, user: data });
			}
		});
	};
	
	/*
	authenticationController.checkToken = (req, res, next) => {
		const authorization = req.headers.authorization;			//do in router?
		const encoded = authorization.substring(6);
		const decoded = Buffer.from(encoded, 'base64').toString('ascii');
		//decoded.split();
		
		console.log('headers.authorization:  ', decoded);
		authenticationService.checkToken(decoded.token, (err, data) => {     //do in router?
			if (err) {
				res.status(401).send({ ok : false, error: err });
			} else {
				res.status(200).send({ ok: true, user: data });
			}
		});
	};
	*/
	return authenticationController;
};

module.exports = createAuthenticationController;

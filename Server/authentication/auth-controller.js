const createAuthenticationController = (authenticationService) => {
	const authenticationController = {};
	
	authenticationController.register = (req, res, next) => {	//service.register is promise?
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
				res.cookie('JWT', token, {
					httpOnly: true,
					maxAge: 1000 * 60 * 15,								// 15 minutes
					//secure: process.env.NODE_ENV === "production",    //use https not http?
				})
				res.send({ ok: true, token });
			})
			.catch((err) => {
				console.log(err.message)
				res.status(401)
				res.send({ ok: false, error: err.message });
		});
	};
	
	return authenticationController;
};

module.exports = createAuthenticationController;

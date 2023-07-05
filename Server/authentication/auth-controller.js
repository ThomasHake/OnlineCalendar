require('dotenv').config();

const createAuthenticationController = (authenticationService) => {
	const authenticationController = {};
	
	authenticationController.register = (req, res, next) => {	//service.register is promise?
		authenticationService
			.register(req.body.password)
			.then((doc) => {
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
					maxAge: parseInt(process.env.ATHENTICATION_DURATION)
					//secure: process.env.NODE_ENV === "production",    //use https not http?
				})
				res.send({ok: true, cookieMaxAge: parseInt(process.env.ATHENTICATION_DURATION)});
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

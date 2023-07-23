require('dotenv').config();

const createAuthenticationController = (authenticationService) => {
	const authenticationController = {};
	
	authenticationController.authenticate = (req, res, next) => {
		authenticationService
			.authenticate(req.body.password)
			.then((token) => {
				res.status(200);			
				res.cookie('JWT', token, {
					httpOnly: true,
					maxAge: parseInt(process.env.ATHENTICATION_DURATION)
					//secure: process.env.NODE_ENV === "production",    	//add to use https?
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

/*
// use to make the password set by client insted of server


	authenticationController.register = (req, res, next) => {	
		authenticationService
			.register(req.body.password)
			.then((doc) => {
				res.status(200).end();
			})
			.catch((err) => {
				res.status(400).send({ ok: false, error: err.message });
			});
	};
*/
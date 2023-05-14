const Router = require('express').Router;
const createAuthenticationController = require('./auth-controller');
const createAuthenticationService = require('./auth-service');

function createAuthenticationRouter(){
	const authenticationService = createAuthenticationService();
	console.log('here')
	console.log(authenticationService)
	console.log('here')
	const authenticationController = createAuthenticationController(authenticationService);

	const authenticationRouter = new Router();

	authenticationRouter.post('/register', authenticationController.register);
	authenticationRouter.post('/authenticate', authenticationController.authenticate);
	authenticationService.register('pass');  // register the password

	return authenticationRouter;
}
	
module.exports = createAuthenticationRouter;

//authenticationService.register('password');  // register the password

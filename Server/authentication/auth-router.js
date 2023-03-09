const Router = require('express').Router;
const createAuthenticationController = require('./auth-controller');
const createAuthenticationService = require('./auth-service');

function createAuthenticationRouter(){
	const authenticationService = createAuthenticationService();
	const authenticationController = createAuthenticationController(authenticationService);

	const authenticationRouter = new Router();

	authenticationRouter.post('/register', authenticationController.register);
	authenticationRouter.post('/authenticate', authenticationController.authenticate);
	
	return authenticationRouter;
}
	
module.exports = createAuthenticationRouter;

//authenticationService.register('password');  // register the password

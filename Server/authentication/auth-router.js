const Router = require('express').Router;
const createAuthenticationController = require('./auth-controller');
const createAuthenticationService = require('./auth-service');
require('dotenv').config();
passwordText = process.env.PASSWORD_PLAIN_TEXT

function createAuthenticationRouter(){
	const authenticationService = createAuthenticationService();
	const authenticationController = createAuthenticationController(authenticationService);

	const authenticationRouter = new Router();

	authenticationRouter.post('/authenticate', authenticationController.authenticate);
	if(passwordText !== ''){
		authenticationService.register(passwordText);  // register password + delete plain text password
	}
	return authenticationRouter;
}
	
module.exports = createAuthenticationRouter;

/*
// use to make the password set by client insted of server

	authenticationRouter.post('/register', authenticationController.register);    
*/
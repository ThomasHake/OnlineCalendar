const Router = require('express').Router;
const createAuthenticationController = require('./authentication-controller');
const createAuthenticationService = require('./authentication-service');


const authenticationService = createAuthenticationService();
const authenticationController = createAuthenticationController(authenticationService);

const authenticationRouter = new Router();

authenticationRouter.post('/register', authenticationController.register);
authenticationRouter.post('/authenticate', authenticationController.authenticate);
authenticationRouter.get('/checkToken', authenticationController.checkToken);

//authenticationService.register('a');  // register the password

module.exports = authenticationRouter;

//authenticationService.register('password');  // register the password

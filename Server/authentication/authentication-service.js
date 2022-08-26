const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const updateEnv = require('./updateEnv');
require('dotenv').config();

const saltRounds = 10;

//pass  in db.authentication
const createAuthenticationService = () => {
	const authenticationService = {};
	
	authenticationService.register = (password) => {
		return bcrypt.hash(password, saltRounds).then((hash) => {
			updateEnv({'AUTHENTICATION_PASSWORD':hash});
		});
	};
	
	authenticationService.authenticate = (password) => {
		return bcrypt.compare(password, process.env.AUTHENTICATION_PASSWORD).then((match) => {
			if (match) {
				const token = jwt.sign(
					{
						exp: Math.floor(Date.now() / 1000) +60 * 60,
					},
					secret
				);
				return token;
			} else throw new Error('password incorrect');
		});
	};
	
	authenticationService.checkToken = (token, cb) => {
		jwt.verify(token, secret, (err, decoded) => {
			console.log( 'err: ', err, 'decoded: ', decoded);
			if (err){
				cb(err);
			} else {
				cb(null);
			}
		});
	};
	return authenticationService;
};

module.exports = createAuthenticationService;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const updateEnv = require('./updateEnv');
require('dotenv').config();

const saltRounds = 10;

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
						exp: Math.floor(Date.now() / 1000) +60 * 60, //expires in 1 hour
					},
					process.env.ACCESS_TOKEN_SECRET
				);
				return token;
			} else throw new Error('password incorrect');
		});
	};
	
	authenticationService.checkToken = (token, cb) => {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err){
				console.log('err', token)
				cb(err);
			} else {
				console.log('ok', token)
				cb();
			}
		});
	};
	return authenticationService;
};

module.exports = createAuthenticationService;

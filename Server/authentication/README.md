# modular authentication system  
  
This folder contains node.js code for a modular authentication system that could be ported into other projects

## features
- allows for integration of check token function into express routing middle-ware.
- Is a single profile authorization system (all users share the same password, there is no username)
- uses Json Web Token authentication.
- saves access token to http only cookie,
- uses the .env file in the parent directory (see parent directory README for .env set up).

## dependencies
- Express
- jsonwebtoken
- bcrypt
- cookie-parser
- dotenv


## How to use

- link a Node.js Express router to the auth-router.js file with an api call. (see index.js in parent directory)
- use the /authentication/authenticate api call in the front end code. ("/authentication" set in index.js in parent directory)
- in api calls that require authentication add code:
	> const checkToken = require('../authentication/auth-mid-checkToken');
	- add "checkToken" as router level middle-ware for api calls that require authentication.

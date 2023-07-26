const cookieParser = require('cookie-parser');
const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const createEventRouter = require('./events/events-router');
const createAuthenticationRouter = require('./authentication/auth-router');
const Router = express.Router;
const app = express();
const server = https.createServer(app);

//https tls certificate
const privateKey = fs.readFileSync('../keys/privkey.pem', 'utf8');
const certificate = fs.readFileSync('../keys/cert.pem', 'utf8');
const ca = fs.readFileSync('../keys/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer = https.createServer(credentials, app);






app.use(express.static(path.join(__dirname, '..', 'Client')));
app.use(express.json({limit: '1mb'}));   
app.use(cookieParser());

authenticationRouter = createAuthenticationRouter();
eventRouter = createEventRouter();

app.use('/authentication', authenticationRouter);
app.use('/calendarjs', eventRouter); 


const port = process.env.PORT || 80;
//server.listen(port, '127.0.0.1', () => console.log(`listening on ${port}`)); //Localhost
server.listen(port, '0.0.0.0', () => console.log(`listening on ${port}`)); //All Interfaces

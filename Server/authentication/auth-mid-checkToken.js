const jwt = require('jsonwebtoken');
require('dotenv').config();

checkToken = (req, res, next) => {
	const token = req.cookies.JWT;

	if (!token) {
		return res.status(401).send({ message: "authentication expired" });
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {	//need catch for exeption. promise?
		if (err){
			console.log('err:', err) 
			return res.status(401).send({ ok: false, error: err });
		}
		next();
	});
}
			   
module.exports = checkToken;
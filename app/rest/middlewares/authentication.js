process.loadEnvFile()
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const message = require('./messages');

exports.authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || !token.length) {
        res.status(401).json({
            error: message.ACCESS_DENIED
        })
    }
    try {
        const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({
            error: message.INVALID_TOKEN
        })
    }
}
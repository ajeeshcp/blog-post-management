const messages = require('./messages');
const service = require('./service');

exports.register = async (req, res) => {
    try {
        await service.register(req.body);
        res.status(200).json({
            message: messages.USER_REGISTRATION_SUCCESS
        })
    } catch (error) {
        res.status(400).json({
            messages: error.message || messages.USER_REGISTRATION_FAILED
        })
    }
};

exports.login = async (req, res) => {
    try {
        const token = await service.login(req.body);
        res.status(201).json({ token });
    } catch (error) {
        res.status(401).json({
            messages: error.message || messages.USER_LOGIN_FAILED,
        });
    }
};
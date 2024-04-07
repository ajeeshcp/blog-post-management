process.loadEnvFile();
const bcrypt = require('bcrypt');
const { users } = require('../../sequelize');
const messages = require('./messages');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const checkUserNameExist = async (username) => {
    const data = await users.findOne({ where: { user_name: username } });
    return data;
};

exports.register = async (createBody) => {
    const { username, password } = createBody;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await checkUserNameExist(username); 
    if (data) {
        throw new Error(messages.USERNAME_EXIST);
    }
    await users.create({ user_name: username, password: hashedPassword });
    return true;
};

exports.login = async (createBody) => {
    const { username, password } = createBody;
    const user = await checkUserNameExist(username);
    if (!user) {
        throw new Error(messages.USER_DOESNT_EXIST);
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        throw new Error(messages.AUTHENTICATION_FAILED);
    }
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: '1Hr'
    })

    return token;
};
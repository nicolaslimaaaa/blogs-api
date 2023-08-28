const jwt = require('jsonwebtoken');

const config = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET || 'senhaSecreta';

const createToken = (user) => jwt.sign(user, secret, config);

module.exports = { createToken };
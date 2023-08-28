const jwt = require('jsonwebtoken');
const { User } = require('../models');
const schema = require('./validations/validationInputsUser');

const login = async (email, password) => {
    const person = await User.findOne({ where: { email } });
    if (!person) return { status: 400, data: { message: 'Invalid fields' } };
    if (password !== person.password) return { status: 400, data: { message: 'Invalid fields' } };

    const token = jwt.sign({
        name: person.name,
        id: person.id,
    }, process.env.JWT_SECRET, {
        expiresIn: '7d',
        algorithm: 'HS256',
    });

    return { status: 200, data: { token } };
};

const create = async (user) => {
    const error = schema.validationInputsUser(user);
    if (error) return { status: error.status, data: { message: error.message } };

    const userAlreadyExists = await User.findOne({ where: { email: user.email } });
    if (userAlreadyExists) return { status: 409, data: { message: 'User already registered' } };
    await User.create(user);
    const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '7d',
        algorithm: 'HS256',
    });

    return { status: 201, data: { token } };
};

module.exports = {
    login,
    create,
};
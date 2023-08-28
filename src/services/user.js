const jwt = require('jsonwebtoken');
const { User } = require('../models');

const create = async (email, password) => {
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

module.exports = {
    create,
};
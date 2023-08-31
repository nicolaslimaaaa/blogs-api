const { User } = require('../models');
const { createToken } = require('../utils/jwt');

const login = async (email, password) => {
    const person = await User.findOne({ where: { email } });
    if (!person) return { status: 400, data: { message: 'Invalid fields' } };
    if (password !== person.password) return { status: 400, data: { message: 'Invalid fields' } };
    
    const token = createToken({
        name: person.dataValues.displayName,
        email,
        id: person.dataValues.id,
    });

    return { status: 200, data: { token } };
};

module.exports = { login };
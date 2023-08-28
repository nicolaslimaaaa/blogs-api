const { User } = require('../models');
const schema = require('./validations/validationInputsUser');
const { createToken } = require('../utils/jwt');

const login = async (email, password) => {
    const person = await User.findOne({ where: { email } });
    if (!person) return { status: 400, data: { message: 'Invalid fields' } };
    if (password !== person.password) return { status: 400, data: { message: 'Invalid fields' } };
    
    const token = createToken({ name: person.dataValues.displayName, email });

    return { status: 200, data: { token } };
};

const create = async (user) => {
    const error = schema.validationInputsUser(user);
    if (error) return { status: error.status, data: { message: error.message } };

    const userAlreadyExists = await User.findOne({ where: { email: user.email } });
    if (userAlreadyExists) return { status: 409, data: { message: 'User already registered' } };
    await User.create(user);
    const token = createToken({ name: user.displayName, email: user.email });

    return { status: 201, data: { token } };
};

const getAll = async () => {
    const user = await User.findAll();
    const userWithoutPassword = user
        .map(({ id, displayName, email, image }) => ({ id, displayName, email, image }));
    return { status: 200, data: userWithoutPassword };
};

module.exports = {
    login,
    create,
    getAll,
};
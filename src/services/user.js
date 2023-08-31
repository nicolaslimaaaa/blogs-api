const { User } = require('../models');
const schema = require('./validations/validationInputsUser');
const { createToken } = require('../utils/jwt');

const create = async (user) => {
    const error = schema.validationInputsUser(user);
    if (error) return { status: error.status, data: { message: error.message } };

    const userAlreadyExists = await User.findOne({ where: { email: user.email } });
    if (userAlreadyExists) return { status: 409, data: { message: 'User already registered' } };
    const userCreated = await User.create(user);
    
    const token = createToken({
        name: user.displayName,
        email: user.email,
        id: userCreated.dataValues.id,
    });

    return { status: 201, data: { token } };
};

const getAll = async () => {
    const user = await User.findAll();
    const userWithoutPassword = user
        .map(({ id, displayName, email, image }) => ({ id, displayName, email, image }));
    return { status: 200, data: userWithoutPassword };
};

const getById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) return { status: 404, data: { message: 'User does not exist' } };

    const userWithoutPassword = {
        id: Number(id),
        displayName: user.displayName,
        email: user.email,
        image: user.image,
    };

    return { status: 200, data: userWithoutPassword };
};

const deleteUser = async (userId) => {
    await User.destroy({ where: { id: userId } });
    return { status: 204, data: {} };
};

module.exports = {
    create,
    getAll,
    getById,
    deleteUser,
};
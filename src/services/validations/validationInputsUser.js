const { userSchema } = require('./schemas');

const validationInputsUser = (user) => {
    const { error } = userSchema.validate(user);

    if (error) return { status: 400, message: error.message };
};

module.exports = {
    validationInputsUser,
};
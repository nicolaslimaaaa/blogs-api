const { categorySchema } = require('./schemas');

const validationInputCategory = (category) => {
    const { error } = categorySchema.validate(category);

    if (error) return { status: 400, message: error.message };
};

module.exports = {
    validationInputCategory,
};
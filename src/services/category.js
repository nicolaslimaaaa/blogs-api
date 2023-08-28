const { Category } = require('../models');
const schema = require('./validations/validationInputCategory');

const create = async (category) => {
    const error = schema.validationInputCategory(category);
    if (error) return { status: error.status, data: { message: error.message } };
    
    const createdCategory = await Category.create(category);

    return { status: 201, data: createdCategory };
};

module.exports = {
    create,
};
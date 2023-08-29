const { Category } = require('../models');
const schema = require('./validations/validationInputCategory');

const create = async (category) => {
    const error = schema.validationInputCategory(category);
    if (error) return { status: error.status, data: { message: error.message } };
    
    const createdCategory = await Category.create(category);

    return { status: 201, data: createdCategory };
};

const getAll = async () => {
    const categories = await Category.findAll();
    
    return { status: 200, data: categories };
};

const findById = async (id) => {
    const category = await Category.findOne({ where: { id } });

    return { status: 200, data: category };
};

module.exports = {
    create,
    getAll,
    findById,
};
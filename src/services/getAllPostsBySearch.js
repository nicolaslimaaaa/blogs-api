const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');

const getAllBySearch = async (search) => {
    const posts = await BlogPost.findAll({
        where: { 
            [Op.or]: [
                { title: { [Op.substring]: search } },
                { content: { [Op.substring]: search } },
            ],
        },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });

    return { status: 200, data: posts };
};

module.exports = { getAllBySearch };
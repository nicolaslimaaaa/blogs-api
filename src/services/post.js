const { BlogPost, User, Category } = require('../models');
const { createPost } = require('./createPost');

const getAll = async () => {
    const posts = await BlogPost.findAll({ include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
    ] });

    return { status: 200, data: posts };
};

const getById = async (id) => {
    const post = await BlogPost.findOne({ where: { id },
include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
    ] });

    if (!post) return { status: 404, data: { message: 'Post does not exist' } };

    return { status: 200, data: post };
};

const deletePost = async (infos) => {
    const { id, userId } = infos;

    const postExists = await getById(id);
    if (postExists.data.message === 'Post does not exist') {
        return { status: postExists.status, data: postExists.data };
    }
    if (postExists.data.dataValues.userId !== Number(userId)) {
        return { status: 401, data: { message: 'Unauthorized user' } };
    }

    await BlogPost.destroy({
        where: { id },
    });

    return { status: 204, data: {} };
};

module.exports = {
    createPost,
    getAll,
    getById,
    deletePost,
};
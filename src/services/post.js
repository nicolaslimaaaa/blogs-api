const categoryService = require('./category');
const { BlogPost, PostCategory, User, Category } = require('../models');
const schema = require('./validations/validationInputsPost');

const createPost = async (post) => {
    const { title, content, categoryIds, tokenInfo: { id: userId } } = post;

    const error = schema.validationInputsPost({ title, content, categoryIds });
    if (error) return { status: error.status, data: { message: error.message } };

    const findCategories = await Promise
        .all(categoryIds.map((id) => categoryService.findById(id)));
    
    const categoryExists = findCategories.every((item) => item.data !== null);
    if (!categoryExists) {
        return { status: 400, data: { message: 'one or more "categoryIds" not found' } }; 
    }

    const newPost = { title, content, userId };

    const createdPost = await BlogPost.create(newPost);

    await Promise.all(
        categoryIds.map((item) => PostCategory
            .bulkCreate([{ postId: createdPost.dataValues.id, categoryId: Number(item) }])),
);
    const postComplete = await BlogPost.findOne({ where: { id: createdPost.id } });

    return { status: 201, data: postComplete };
};

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

const updateInfos = async (infos) => {
    const { title, content, id, userId } = infos;

    const error = schema.validationInputsUpdatePost({ title, content });
    if (error) return { status: error.status, data: { message: error.message } };

    const postExists = await getById(id);
    if (!postExists) return { status: postExists.status, data: { message: postExists.data } };
    console.log(postExists);
    if (postExists.data.dataValues.userId !== Number(userId)) {
        return { status: 401, data: { message: 'Unauthorized user' } };
    }
    postExists.data.title = title;
    postExists.data.content = content;
    await postExists.data.save();
            
    return { status: 200, data: postExists.data };
};

module.exports = {
    createPost,
    getAll,
    getById,
    updateInfos,
};
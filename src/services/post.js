const categoryService = require('./category');
const { BlogPost, PostCategory } = require('../models');
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

module.exports = {
    createPost,
};
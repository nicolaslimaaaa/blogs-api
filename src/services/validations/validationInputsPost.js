const { postSchema, updatePostSchema } = require('./schemas');

const validationInputsPost = (post) => {
    const { error } = postSchema.validate(post);

    if (error) return { status: 400, message: error.message };
};

const validationInputsUpdatePost = (updatePost) => {
    const { error } = updatePostSchema.validate(updatePost);

    if (error) return { status: 400, message: error.message };
};

module.exports = {
    validationInputsPost,
    validationInputsUpdatePost,
};
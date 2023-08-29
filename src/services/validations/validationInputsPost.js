const { postSchema } = require('./schemas');

const validationInputsPost = (post) => {
    const { error } = postSchema.validate(post);

    if (error) return { status: 400, message: error.message };
};

module.exports = {
    validationInputsPost,
};
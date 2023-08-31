const schema = require('./validations/validationInputsPost');
const { postService } = require('.');

const updateInfos = async (infos) => {
    const { title, content, id, userId } = infos;

    const error = schema.validationInputsUpdatePost({ title, content });
    if (error) return { status: error.status, data: { message: error.message } };

    const postExists = await postService.getById(id);
    if (postExists.data.message === 'Post does not exist') {
        return { status: postExists.status, data: postExists.data };
    }
    
    if (postExists.data.dataValues.userId !== Number(userId)) {
        return { status: 401, data: { message: 'Unauthorized user' } };
    }
    postExists.data.title = title;
    postExists.data.content = content;
    await postExists.data.save();
            
    return { status: 200, data: postExists.data };
};

module.exports = { updateInfos };
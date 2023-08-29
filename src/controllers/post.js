const { postService } = require('../services');

const createPost = async (req, res) => {
    const { status, data } = await postService.createPost(req.body);
    return res.status(status).json(data);
};

const getAll = async (req, res) => {
    const { status, data } = await postService.getAll();

    return res.status(status).json(data);
};

module.exports = {
    createPost,
    getAll,
};
const { postService } = require('../services');
const { updateInfos } = require('../services/updateInfos');

const createPost = async (req, res) => {
    const { status, data } = await postService.createPost(req.body);
    return res.status(status).json(data);
};

const getAll = async (req, res) => {
    const { status, data } = await postService.getAll();

    return res.status(status).json(data);
};

const getById = async (req, res) => {
    const { id } = req.params;

    const { status, data } = await postService.getById(id);

    return res.status(status).json(data);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, tokenInfo: { id: userId } } = req.body;

    const { status, data } = await updateInfos({ title, content, id, userId });

    return res.status(status).json(data);
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const { tokenInfo: { id: userId } } = req.body;

    const { status, data } = await postService.deletePost({ id, userId });

    return res.status(status).json(data);
};

const getAllBySearch = async (req, res) => {
    const { q: search } = req.query;
    
    const { status, data } = await postService.getAllBySearch(search);

    res.status(status).json(data);
};

module.exports = {
    createPost,
    getAll,
    getById,
    updatePost,
    deletePost,
    getAllBySearch,
};
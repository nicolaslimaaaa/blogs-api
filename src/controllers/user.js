const { userService } = require('../services');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { status, data } = await userService.login(email, password);

        res.status(status).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const create = async (req, res) => {
    const { status, data } = await userService.create(req.body);

    return res.status(status).json(data);
};

const getAll = async (req, res) => {
    const { status, data } = await userService.getAll(req.body);
    
    return res.status(status).json(data);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await userService.getById(id);
    
    return res.status(status).json(data); 
};

const deleteUser = async (req, res) => {
    const { tokenInfo } = req.body;
    console.log(tokenInfo);
    const { status, data } = await userService.deleteUser(tokenInfo.id);

    return res.status(status).json(data);
};

module.exports = {
    login,
    create,
    getAll,
    getById,
    deleteUser,
};
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

module.exports = {
    login,
    create,
};
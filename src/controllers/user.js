const { userService } = require('../services');

const create = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { status, data } = await userService.create(email, password);

        res.status(status).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    create,
};
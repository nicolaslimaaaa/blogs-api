const jwt = require('jsonwebtoken');

const validateAuthorization = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const token = authorization.split(' ')[1];
    try {
        const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
        req.body = { ...req.body, tokenInfo };
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
    
    next();
};

module.exports = validateAuthorization;
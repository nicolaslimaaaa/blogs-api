const route = require('express').Router();
const { userController } = require('../controllers');
const validateAuthorization = require('../middlewares/validateAuthorization');

route.post('/', userController.create);
route.get('/', validateAuthorization, userController.getAll);

module.exports = route;
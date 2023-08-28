const route = require('express').Router();
const { userController } = require('../controllers');
const validateAuthorization = require('../middlewares/validateAuthorization');

route.post('/', userController.create);
route.get('/', validateAuthorization, userController.getAll);
route.get('/:id', validateAuthorization, userController.getById);

module.exports = route;
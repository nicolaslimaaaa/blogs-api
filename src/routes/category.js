const route = require('express').Router();
const { categoryController } = require('../controllers');
const validateAuthorization = require('../middlewares/validateAuthorization');

route.post('/', validateAuthorization, categoryController.create);
route.get('/', validateAuthorization, categoryController.getAll);

module.exports = route;
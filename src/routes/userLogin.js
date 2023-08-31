const route = require('express').Router();
const { userController } = require('../controllers');
const validateLogin = require('../middlewares/validateLogin');

route.post('/', validateLogin, userController.userLogin);

module.exports = route;
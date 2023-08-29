const route = require('express').Router();
const { postController } = require('../controllers');
const validateAuthorization = require('../middlewares/validateAuthorization');

route.post('/', validateAuthorization, postController.createPost);

module.exports = route;
const route = require('express').Router();
const { postController } = require('../controllers');
const validateAuthorization = require('../middlewares/validateAuthorization');

route.post('/', validateAuthorization, postController.createPost);
route.get('/', validateAuthorization, postController.getAll);

module.exports = route;
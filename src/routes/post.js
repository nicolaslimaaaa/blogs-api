const route = require('express').Router();
const { postController } = require('../controllers');
const validateAuthorization = require('../middlewares/validateAuthorization');

route.post('/', validateAuthorization, postController.createPost);
route.get('/', validateAuthorization, postController.getAll);
route.get('/search?', validateAuthorization, postController.getAllBySearch);
route.get('/:id', validateAuthorization, postController.getById);
route.put('/:id', validateAuthorization, postController.updateInfos);
route.delete('/:id', validateAuthorization, postController.deletePost);

module.exports = route;
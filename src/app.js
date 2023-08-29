const express = require('express');
const { userLogin, user, category, post } = require('./routes');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/login', userLogin);
app.use('/user', user);
app.use('/categories', category);
app.use('/post', post);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const token = require('./middlewares/token');

const talkersJson = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// requisito 1
app.get('/talker', async (_req, res) => {
  const talkerFile = await fs.readFile(talkersJson, 'utf-8');
  const talkers = await JSON.parse(talkerFile);
  res.status(200).json(talkers);
});

// requisito 2
// https://webdevidea.com/blog/difference-between-find-and-findindex-in-javascript/#:~:text=The%20only%20difference%20is%20that,method%20returns%20the%20element%20index.
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerFile = await fs.readFile(talkersJson, 'utf-8');
  const talkers = await JSON.parse(talkerFile);
  const talkerById = talkers.find((t) => `${t.id}` === id);
  // const talkerById = talkers.find((t) => t.id === parseInt(id, 10));
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talkerById);
});

// requisito 3
// https://codeshack.io/basic-login-system-nodejs-express-mysql/
// https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
// https://stackoverflow.com/questions/6603015/check-whether-a-string-matches-a-regex-in-js
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const validEmail = regexEmail.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token });
});
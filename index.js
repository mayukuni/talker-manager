const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

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
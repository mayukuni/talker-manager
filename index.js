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
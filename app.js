const express = require('express');
const { sendTopics } = require('./controllers/topics-controller');

const app = express();

app.use(express.json());

app.get('/api/topics', sendTopics);

app.all('/*', (req, res) => {
  res.status(404).send({ message: 'path not found'});
});

module.exports = app;

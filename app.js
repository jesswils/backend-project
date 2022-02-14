const express = require('express');
const { sendTopics, sendArticles } = require('./controllers/topics-controller');

const app = express();

app.use(express.json());

app.get('/api/topics', sendTopics);

app.get('/api/articles/:article_id', sendArticles);

app.all('/*', (req, res) => {
  res.status(404).send({ message: 'path not found'});
});

module.exports = app;

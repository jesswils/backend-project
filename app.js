const express = require('express');
const { sendTopics, sendArticles } = require('./controllers/get-controller');
const { patchArticle } = require('./controllers/patch-controller');

const app = express();

app.use(express.json());

app.get('/api/topics', sendTopics);

app.get('/api/articles/:article_id', sendArticles);

app.patch('/api/articles/:article_id', patchArticle);


////////////////////
// Error handling //
///////////////////


app.use((err, req, res, next) => {
  console.log(err)
  res.status(400).send({ message: 'bad request'});
  next(err)
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send({ message: 'server error'});
  next(err)
})

app.all('/*', (req, res) => {
  res.status(404).send({ message: 'not found' });
});


module.exports = app;

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

app.all('/*', (req, res) => {
  res.status(500).send({ message: 'server error' });
});


// app.use((err, req, res, next) => {

// })

// app.use((err, req, res, next) => {
//   res.status(500).send('server error');

// });

module.exports = app;

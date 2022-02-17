const res = require('express/lib/response');
const {
  selectTopics,
  selectArticles,
  selectArticlesById,
} = require('../models/get-model');

exports.sendTopics = (req, res, next) => {
  // console.log('in the controller')
  selectTopics()
    .then((topic) => {
      res.status(200).send({ topic });
    })
    .catch((err) => {
      next(err);
    });
};

exports.sendArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.sendArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

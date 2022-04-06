const res = require('express/lib/response');
const {
  selectTopics,
  selectArticles,
  selectArticlesById,
  selectUsers,
  selectCommentsById,
  postCommentById
} = require('../models/get-model');

exports.sendTopics = (req, res, next) => {
  selectTopics()
    .then((topic) => {
      res.status(200).send({ topic });
    })
    .catch((err) => {
      next(err);
    });
};

exports.sendArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  selectArticles(sort_by, order, topic)
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

exports.sendCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsById(article_id)
    .then((comments) => {
      res.status(200).send({ comments })
    })
    .catch((err) => {
      next(err)
    })
}

exports.sendUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.publishCommentById = (req, res, next) => {
  const { article_id } = req.params
  const { body, username } = req.body
  postCommentById(article_id, body, username)
    .then(([comment]) => {
      res.status(201).send({ comment })
    })
    .catch((err) => {
      next(err)
    })
}
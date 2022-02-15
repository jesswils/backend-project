const { updateArticle } = require("../models/patch-model");

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  console.log(article_id, req.body);
  updateArticle(req.body, article_id)
    .then((updatedArticle) => {
      res.status(200).send({ article: updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
};

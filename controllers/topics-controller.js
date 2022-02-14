const { selectTopics } = require('../models/topics-model');

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

const { selectTopics } = require('../models/topics');

exports.sendTopics = (req, res, next) => {
    selectTopics()
        .then((topic) => {
            res.status(200).send({ topic });
        })
        .catch((err) => {
            next(err);
        });
};
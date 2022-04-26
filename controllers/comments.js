const { selectCommentsById, postCommentById, deleteCommentById } = require('../models/comments');

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

exports.deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params
    deleteComment(comment_id).then(() => {
        res.status(204).send(`comment deleted`);
    }).catch((err) => {
        next(err)
    })
}
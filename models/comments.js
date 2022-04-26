const db = require('../db/connection');

exports.selectCommentsById = (article_id) => {
    return db.query('SELECT comments.body, comments.votes, comments.author, comments.created_at, comments.comment_id FROM comments LEFT JOIN articles ON comments.article_id = articles.article_id WHERE articles.article_id = $1;', [article_id]).then((results) => {
        return results.rows
    })
}

exports.postCommentById = (article_id, body, username) => {
    return db.query(`INSERT INTO "comments"
    (article_id, body, author)
    VALUES
    ($1,$2,$3)
    RETURNING *;`, [article_id, body, username]).then((results) => {
        return results.rows
    })
}

exports.deleteComment = (comment_id) => {
    return db.query('DELETE FROM comments WHERE comment_id = $1', [comment_id]).then((results) => {
        return results.rows
    })
}
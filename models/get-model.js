const db = require('../db/connection');

exports.selectTopics = () => {
    // console.log('in the model')
    return db.query('SELECT * FROM topics;').then((results) => {
        return results.rows
    })
};

exports.selectArticles = () => {
    return db.query('SELECT author, title, article_id, created_at, topic, created_at, votes FROM articles ORDER BY created_at DESC;').then((results) => {
        return results.rows
    })
}

exports.selectArticlesById = (article_id) => {
    // console.log('in the model')
    return db.query(`SELECT author, title, article_id, body, topic, created_at, votes, (SELECT COUNT(*) FROM comments WHERE articles.article_id = comments.article_id) AS comment_count FROM articles WHERE article_id = $1`, [article_id]).then((results) => {
        return results.rows
    })
}

exports.selectCommentsById = (article_id) => {
    return db.query('SELECT comments.body, comments.votes, comments.author, comments.created_at, comments.comment_id FROM comments LEFT JOIN articles ON comments.article_id = articles.article_id WHERE articles.article_id = $1;', [article_id]).then((results) => {
        return results.rows
    })
}

exports.selectUsers = () => {
    return db.query('SELECT username FROM users;').then((results) => {
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
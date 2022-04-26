const db = require('../db/connection');

exports.selectArticles = (sort_by = 'created_at', order = 'desc', topic) => {
    if (!['article_id', 'author', 'created_at', 'title', 'topic', 'votes'].includes(sort_by)) {
        return Promise.reject({ status: 400, message: 'Invalid sort query' });
    }
    if (!['asc', 'desc'].includes(order)) {
        return Promise.reject({ status: 400, message: 'Invalid order query' });
    }
    if (!['cats', 'mitch', 'coding', 'football', 'cooking', undefined].includes(topic)) {
        return Promise.reject({ status: 400, message: 'Invalid topic query' });
    }
    const topicQuery = topic === undefined ? "" : `WHERE topic = '${topic}'`;

    return db.query(`SELECT author, title, article_id, created_at, topic, votes FROM articles ${topicQuery} ORDER BY ${sort_by} ${order};`).then((results) => {
        return results.rows
    })
}

exports.selectArticlesById = (article_id) => {
    return db.query(`SELECT author, title, article_id, body, topic, created_at, votes, (SELECT COUNT(*) FROM comments WHERE articles.article_id = comments.article_id) AS comment_count FROM articles WHERE article_id = $1`, [article_id]).then((results) => {
        return results.rows
    })
}

exports.updateArticle = (updateVotes, article_id) => {
    const { votes } = updateVotes;
    return db
        .query(
            "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
            [votes, article_id]
        )
        .then(({ rows }) => {
            return rows[0];
        });
};

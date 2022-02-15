const db = require('../db/connection');

exports.updateArticle = (updateVotes, article_id) => {
    const { votes } = updateVotes;
    return db.query('UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;', [votes, article_id]).then(({rows}) => {
        return rows[0]
    })
}

// query
// model made aware of article id and votes
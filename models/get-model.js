const db = require('../db/connection');

exports.selectTopics = () => {
    // console.log('in the model')
    return db.query('SELECT * FROM topics;').then((results) => {
        return results.rows
    })
};

exports.selectArticles = () => {
    return db.query('SELECT * FROM articles;').then((results) => {
        return results.rows[0]
    })
}

exports.selectArticlesById = (article_id) => {
    // console.log('in the model')
    return db.query('SELECT * FROM articles WHERE article_id = $1;', [article_id]).then((results) => {
        return results.rows
    })
}


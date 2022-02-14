const db = require('../db/connection');

exports.selectTopics = () => {
    // console.log('in the model')
    return db.query('SELECT * FROM topics;').then((results)=> {
        return results.rows
    })
};

exports.selectArticles = () => {
    // console.log('in the model')
    return db.query('SELECT * FROM articles;').then((results) => {
        return results.rows
    })
}
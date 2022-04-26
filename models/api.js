const db = require('../db/connection');
const fs = require('fs/promises');

exports.fetchEndpoints = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`)
        .then((contents) => JSON.parse(contents))
};

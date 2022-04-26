const { fetchEndpoints } = require('../models/api');

exports.getEndpoints = (req, res, next) => {
  fetchEndpoints().then((data) => {
    res.status(200).send({ data })
  })
    .catch((err) => {
      next(err)
    })
};



const asyncMiddleware = require('../middleware/async')

// TODO: make it happen
const PUT = async (req, res) => {
  res.sendStatus(200)
}

module.exports = {
  PUT: asyncMiddleware(PUT)
}

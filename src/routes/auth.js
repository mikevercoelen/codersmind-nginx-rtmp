const asyncMiddleware = require('../middleware/async')

// TODO: make it happen
const POST = async (req, res) => {
  res.sendStatus(200)
}

module.exports = {
  POST: asyncMiddleware(POST)
}

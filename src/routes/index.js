const auth = require('./auth')
const s3 = require('./s3')
const info = require('./info')

const setupRoutes = app => {
  app.post('/auth', auth.POST)
  app.put('/s3/:videoId/:fileName', s3.PUT)
  app.get('/info', info.GET)
}

module.exports = setupRoutes

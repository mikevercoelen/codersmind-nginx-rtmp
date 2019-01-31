const app = require('./app')
const logger = require('./helpers/logger')

const PORT = process.env.PORT

const startServer = async () => Promise.all([
  app.listen(PORT)
])

startServer()
  .then(() => {
    logger.debug(`Node server (${process.env.NODE_ENV}) has started on port ${PORT}`)
  })
  .catch(error => logger.error(error))

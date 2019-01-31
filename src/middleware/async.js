const async = middleware => (req, res, next) => {
  Promise
    .resolve(middleware(req, res, next))
    .catch(next)
}

module.exports = async

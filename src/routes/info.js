const si = require('systeminformation')

const GET = async (req, res) => {
  const [mem, currentLoad] = await Promise.all([
    si.mem(),
    si.currentLoad()
  ])

  res.json({
    data: {
      mem,
      currentLoad
    }
  })
}

module.exports = {
  GET
}

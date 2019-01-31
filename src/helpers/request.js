const https = require('https')

// https://nodejs.org/api/http.html#http_http_request_url_options_callback

const request = (options, data) => new Promise((resolve, reject) => {
  if (options.hasJson) {
    options.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers || {}
    }

    if (data) {
      data = JSON.stringify(data)
    }
  }

  const req = https.request(options, res => {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      const error = new Error('Invalid response')
      error.statusCode = res.statusCode
      error.res = res
      return reject(res)
    }

    let returnResponse = {
      statusCode: res.statusCode,
      body: []
    }

    res.on('data', chunk => {
      returnResponse.body.push(chunk)
    })

    res.on('end', () => {
      if (options.method === 'HEAD') {
        return resolve(returnResponse)
      }

      if (options.hasJson === true) {
        try {
          returnResponse.body = JSON.parse(Buffer.concat(returnResponse.body).toString())
        } catch (error) {
          reject(error)
        }
      }

      resolve(returnResponse)
    })
  })

  req.on('error', (error) => {
    reject(error)
  })

  if (data) {
    req.write(data)
  }

  req.end()
})

module.exports = request

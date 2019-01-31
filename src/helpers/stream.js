const aws = require('aws-sdk')

/* eslint-disable promise/param-names, no-return-assign */

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
})

const uploadS3 = (filename, contentType, body) => new Promise((resolve, reject) => {
  s3.upload({
    Bucket: process.env.AWS_BUCKET,
    Body: body,
    Key: filename,
    ContentType: contentType
  }, (error, data) => {
    if (error) {
      return reject(error)
    }

    resolve(data)
  })
})

// TODO: make it happen

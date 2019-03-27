const aws = require('aws-sdk')
const fs = require('fs')
const BUCKET_NAME = 'bazaar-static'

exports.create = payload => {
  aws.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: 'eu-central-1', // region of your bucket,
    Bucket: BUCKET_NAME
  })
  const s3Bucket = new aws.S3()
  const fileName = `${Date.now()}-${payload.name}`

  return s3Bucket
    .upload({
      ACL: 'public-read',
      Key: fileName,
      Bucket: BUCKET_NAME,
      Body: fs.readFileSync(payload.path),
      ContentType: 'binary'
    }).promise()
    .then(data => {
      console.log(`${fileName} uploaded to ${BUCKET_NAME}.`)
      return {
        url: data.Location
      }
    })
}

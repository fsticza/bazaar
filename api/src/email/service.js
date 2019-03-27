const aws = require('aws-sdk')

exports.create = payload => {
  aws.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: 'eu-west-1'
  })
  // Create sendEmail params
  const params = {
    Destination: { /* required */
      CcAddresses: payload.ccAddresses,
      ToAddresses: payload.toAddresses
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
          Charset: 'UTF-8',
          Data: payload.html
        },
        Text: {
          Charset: 'UTF-8',
          Data: payload.text
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: payload.subject
      }
    },
    Source: 'noreply@occoord.com', /* required */
    ReplyToAddresses: [
      'info@occoord.com'
    ]
  }

  // Create the promise and SES service object
  const sendPromise = new aws.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise()

  // Handle promise's fulfilled/rejected states
  return sendPromise.then(data => {
    console.log(data.MessageId)
    return data
  }).catch(err => {
    console.error(err, err.stack)
  })
}

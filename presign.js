'use strict';
const AWS = require('aws-sdk')
const s3 = new AWS.S3({region:'eu-west-1'})

let myKey = ''
const signedUrlExpireSeconds = 60 * 5

exports.handler = function(event, context, callback) {
  console.log("event received", event)
  if (event.body) {
    let body = JSON.parse(event.body)
    if(body.filename) {
      myKey = body.filename   
    }
  }
  console.log("filename is", myKey)
  console.log("to bucket:", process.env.BUCKET_NAME)
  let json = {}
  json.url = s3.getSignedUrl('putObject', {
    Bucket: process.env.BUCKET_NAME,
    Key: myKey,
    Expires: signedUrlExpireSeconds,
    ContentType: 'binary/octet-stream'    
  })
  let result = {
    statusCode: 200,
    body: JSON.stringify(json),
    headers: {'content-type': 'text/json'}
  }
  console.log("ok for", json.url)
  callback(null, result)
}

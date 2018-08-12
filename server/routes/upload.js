const express = require('express');
const router = express.Router();
const config = require('../config');
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: config.awsS3AccessKeyId,
  secretAccessKey: config.awss3SecretKey,
  signatureVersion: 'v4',
  region: 'ap-south-1'
});

router.route('/images')
.get((req, res, next) => {
  const key = `images/${uuid()}.jpg`
  s3.getSignedUrl('putObject', {
    Bucket: 'YOUR-BUCKET-NAME',
    ContentType: 'image/jpeg',
    Key: key
  }, (err, url) => {
    res.send({key, url});
  })
});

module.exports = router;
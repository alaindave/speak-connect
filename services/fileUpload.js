const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
	secretAccessKey: process.env.secretAccessKey,
	accessKeyId: process.env.accessKeyId,
	region: 'ca-central-1'
});

const s3 = new aws.S3();

const upload = multer({
	storage: multerS3({
		s3,
		bucket: 'speak-app-bucket',
		acl: 'public-read',
		metadata: function(req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function(req, file, cb) {
			console.log('file to upload:', file);
			cb(null, Date.now().toString());
		}
	})
});
module.exports = upload;

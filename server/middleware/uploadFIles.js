const multer = require("multer");
const path = require('path');
const CustomError = require('../middleware/error/customError');

const allowedMimeTypes = ['image/jpeg', 'image/png']; // Allowed filepath

function fileFilter(req, img, cb) {
    try {
      if (allowedMimeTypes.includes(img.mimetype)) {
        cb(null, true); // Accept the img
      } else {
        throw new Error('Invalid image type. Only JPEG and PNG allowed'); // Throw an error for rejection
      }
    } catch (err) {
      err.status = 400
      cb(err, false); // Pass the error to the callback (rejected)
    }
}

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        let destDir = 'uploads'
        cb(null, destDir);
    },
    filename: function (req, img, cb) {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${img.originalname}`);
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});

module.exports = upload;
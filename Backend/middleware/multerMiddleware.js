const multer = require('multer');
const allowedMimeTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(new Error('Only PDF and PPT files are allowed'));
  }
};

// Initialize multer with the storage engine and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter }).single('file');

module.exports = upload;

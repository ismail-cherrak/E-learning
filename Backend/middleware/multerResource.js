// multerConfig.js
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        // Use the original file name with its extension
        cb(null, file.originalname);
    }
});

// File upload filter (optional)
const fileFilter = (req, file, cb) => {
    // Accept only certain file types (e.g., PDF, ZIP)
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/zip') {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only PDF and ZIP files are allowed.'), false); // Reject the file
    }
};

// Initialize Multer with the configured options
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;

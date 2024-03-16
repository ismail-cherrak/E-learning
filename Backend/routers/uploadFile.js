const express = require('express');
const uploadMiddleware = require('../middleware/multerMiddleware');
const fileController = require('../Controllers/fileController');

const router = express.Router();

router.post('/', uploadMiddleware, fileController);
router.post('/:cardId/files', uploadMiddleware, fileController);

module.exports = router;

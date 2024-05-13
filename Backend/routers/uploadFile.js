const express = require('express');
const uploadMiddleware = require('../middleware/multerMiddleware');
const fileController = require('../Controllers/fileController');
const authMiddleware =require('../middleware/requireAuth');


const router = express.Router();

router.post('/', [authMiddleware,uploadMiddleware], fileController);
router.post('/:cardId/files', [authMiddleware,uploadMiddleware], fileController);

module.exports = router;

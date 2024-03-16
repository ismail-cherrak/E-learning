const express = require('express');
const router = express.Router();
const { editChapterName } = require('../Controllers/chapterController');

router.put('/:chapterId/edit', editChapterName);

module.exports = router;

const express = require('express');
const router = express.Router();
const authMiddleware =require('../middleware/requireAuth');
const teacherMiddleware = require('../middleware/chargeCourMiddleware');

const { editChapterName ,addChapter, deleteChapter} = require('../Controllers/chapterController');

router.put('/:chapterId/edit',/*authMiddleware,*/ editChapterName);
router.post('/:moduleId/addChapter',/*authMiddleware,*/  addChapter )
router.delete('/:moduleId/:chapterId', deleteChapter)

module.exports = router;

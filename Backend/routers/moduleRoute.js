const express = require('express');
const router = express.Router();
const moduleController = require('../Controllers/moduleController');
const authMiddleware =require('../middleware/requireAuth');
const teacherMiddleware = require('../middleware/chargeCourMiddleware');
router.post('/addModule', /* authMiddleware,*/ moduleController.addModule );
router.get('/:moduleId/program',/* authMiddleware,*/ moduleController.getModuleProgram);
router.get('/:moduleId/resources',/* authMiddleware,*/moduleController.getModuleResources);
router.get('/:moduleId/quizzes',/* authMiddleware,*/moduleController.getModuleQuizzes);
router.get('/:moduleId/quizzesVisible',/* authMiddleware,*/moduleController.getModuleQuizzesVisible);
router.delete('/:moduleId/quizzes/:quizzId',/* authMiddleware,*/ moduleController.deleteQuizz);

router.get('/', moduleController.getAllModules);



router.post('/:moduleId/resources',authMiddleware, moduleController.addModuleResource);
module.exports = router;

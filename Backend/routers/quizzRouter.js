const express = require('express');
const router = express.Router();
const quizzController = require('../Controllers/quizzController');
const authMiddleware =require('../middleware/requireAuth');
const teacherMiddleware = require('../middleware/chargeCourMiddleware');


// Route to get all quizzes
router.get('/', authMiddleware,quizzController.getAllQuizzes);
router.get('/visible',authMiddleware, quizzController.getAllVisibleQuizzes);


// Route to get a single quizz by ID
router.get('/:quizId', authMiddleware,quizzController.getQuizById);
router.get('/:quizId/getSubmitted'/*,authMiddleware*/,quizzController.getAllSubmittedWork);
router.put('/:quizzId/toggleVisibility',authMiddleware ,  quizzController.toggleQuizzVisibility);
router.delete('/:quizzId',authMiddleware, quizzController.deleteQuizz);
router.post('/add/:moduleId'/*, authMiddleware*/, quizzController.addQuiz);
router.post('/:quizId/addQuestion', authMiddleware,quizzController.addQuestion);
router.post('/:quizId/submit'/*, authMiddleware*/, quizzController.submitQuizz);
router.get('/:moduleId/quizzes',/* authMiddleware,*/quizzController.getModuleQuizzes);
module.exports = router;

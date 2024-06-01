const express = require('express');
const router = express.Router();
const devoirController = require('../Controllers/devoirController');
const multerMiddleware = require('../middleware/multerResource');
const authMiddleware =require('../middleware/requireAuth');
const teacherMiddleware = require('../middleware/chargeCourMiddleware');
const studentMiddleware = require('../middleware/studentMiddleware');

// Route to get all devoirs
router.get('/', /*authMiddleware,*/ devoirController.getAllDevoirs);
router.get('/:devoirId/submitedwork', /*authMiddleware,*/ devoirController.getDevoirsAndSubmissions);
// Route to get a single devoir by ID
router.get('/:devoirId', /*authMiddleware,*/devoirController.getDevoirById);
router.post('/add', /*authMiddleware,*/ devoirController.addDevoir);
router.delete('/:devoirId', /*authMiddleware,*/  devoirController.deleteDevoir);
router.put('/:devoirId/visibility', devoirController.toggleDevoirVisibility);
router.post('/:devoirId/submit',multerMiddleware.single('file'), devoirController.submitWork);
router.get('/:moduleId/devoirs',devoirController.getDevoirsByModule)

module.exports = router;

const express = require('express');
const router = express.Router();
const resourceController = require('../Controllers/resourceController');
const upload = require('../middleware/multerResource');
const authMiddleware =require('../middleware/requireAuth');

// Route to get all resources
router.get('/', authMiddleware,resourceController.getAllResources);

// Route to get a single resource by ID
router.get('/:resourceId', authMiddleware,resourceController.getResourceById);
router.post('/:moduleId/add',/* [authMiddleware ,*/ upload.single('file')/*]*/, resourceController.addRessource);
router.delete('/:resourceId',authMiddleware, resourceController.deleteResource);
module.exports = router;

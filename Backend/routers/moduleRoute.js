const express = require('express');
const router = express.Router();
const moduleController = require('../Controllers/moduleController');
router.get('/:moduleId/program', moduleController.getModuleProgram);
router.get('/:moduleId/resources', moduleController.getModuleProgram);
router.post('/:moduleId/resources', moduleController.addModuleResource);
module.exports = router;

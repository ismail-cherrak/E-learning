const express = require('express');
const downloadFile = require('../Controllers/downloadFile')
const router = express.Router();

router.get('/:fileName', downloadFile);

module.exports = router;

const express = require('express');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)
/////////////////////////////////

module.exports = router
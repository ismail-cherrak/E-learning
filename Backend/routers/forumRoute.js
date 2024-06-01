const express = require('express');
const router = express.Router();
const forumController = require('../Controllers/forumController');

// Route to get all forums for a specific module
router.get('/:moduleId/forums', forumController.getAllForums);

router.post('/:moduleId/add', forumController.addPost);

router.post('/reply', forumController.addReply);

router.delete('/deleteReply',forumController.deleteReply)

router.delete('/deletePost',forumController.deletePost)



// Add more routes as needed for other forum-related actions such as creating, updating, or deleting forums

module.exports = router;

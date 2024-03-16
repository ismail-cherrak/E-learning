const express = require('express');
const router = express.Router();
const addFileToCard = require('../Controllers/fileController');
const cardController = require('../Controllers/cardController');
const uploadMiddleware = require('../middleware/multerMiddleware');
const { toggleCardVisibility } = require('../Controllers/cardController');
router.delete('/:cardId/delete', cardController.deleteCard);
router.put('/:cardId/visibility', async (req, res) => {
    const { cardId } = req.params;
    try {
        const updatedCard = await toggleCardVisibility(cardId);
        res.json(updatedCard);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error toggling card visibility.');
    }
});
router.post('/:chapterId/cards', cardController.addCardToChapter);
router.post('/:cardId/files', uploadMiddleware, addFileToCard);
module.exports = router;

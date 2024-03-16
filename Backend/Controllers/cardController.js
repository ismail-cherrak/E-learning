const Card = require('../models/cardSchema')
const File = require('../models/fileSchema');
  const addCardToChapter = async (req, res) => {
    const { chapterId } = req.params;
    const { title } = req.body;

    try {
        // Check if the chapter exists
        const chapter = await Chapter.findById(chapterId);
        if (!chapter) {
            return res.status(404).send('Chapter not found');
        }

        // Create a new card
        const newCard = new Card({ title });
        await newCard.save();

        // Add the card to the chapter
        chapter.cards.push(newCard);
        await chapter.save();

        res.status(201).json(newCard);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding card to chapter');
    }
};
  const deleteCard = async (req, res) => {
    const { cardId } = req.params;

    try {
        // Find the card by ID and delete it
        const deletedCard = await Card.findByIdAndDelete(cardId);
        
        if (!deletedCard) {
            return res.status(404).json({ message: 'Card not found.' });
        }

        res.json({ message: 'Card deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting card.' });
    }
};

const toggleCardVisibility = async (cardId) => {
    try {
        // Find the card by its ID
        const card = await Card.findById(cardId);
        if (!card) {
            throw new Error('Card not found');
        }
        // Toggle the visibility
        card.visibility = !card.visibility;
        // Save the updated card
        const updatedCard = await card.save();
        return updatedCard;
    } catch (error) {
        throw error;
    }
};

  module.exports = {
    deleteCard,
    toggleCardVisibility,
    addCardToChapter,
};


  
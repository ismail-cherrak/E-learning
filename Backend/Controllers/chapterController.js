const Chapter = require('../models/chapterSchema');

const editChapterName = async (req, res) => {
    const { chapterId } = req.params;
    const { newName } = req.body;

    try {
        // Find the chapter by its ID
        const chapter = await Chapter.findById(chapterId);

        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }

        // Update the chapter's name
        chapter.title = newName;

        // Save the updated chapter
        const updatedChapter = await chapter.save();

        res.status(200).json(updatedChapter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating chapter name' });
    }
};

module.exports = { editChapterName };

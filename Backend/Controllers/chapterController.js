const Chapter = require('../models/chapterSchema');
const moduleModel = require('../models/moduleSchema')
const Card = require('../models/cardSchema')


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

const addChapter = async (req, res) => {
    const { title } = req.body // Extract the title from the frontend request
    const { moduleId } = req.params

    const moduleObj = await moduleModel.findById(moduleId)
    // console.log(moduleObj)

    if(!moduleObj){
        throw Error('module not found')
    }

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        // Create a new chapter with the given title and an empty array for cards
        const newChapter = new Chapter({
            title,
            cards: []
        });

        // Save the new chapter to the database
         
        
        await newChapter.save();
        moduleObj.program.push(newChapter)
        
        await moduleObj.save()
        

        

        // Return the created chapter in the response
        res.status(201).json({ message: 'Chapter created successfully', chapter: newChapter });
    } catch (error) {
        console.error('Error creating chapter:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const deleteChapter = async (req, res) => {
    try {
        const { moduleId, chapterId } = req.params;

        // Find the chapter to be deleted
        const chapter = await Chapter.findById(chapterId);

        // If the chapter is not found, return an error
        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }

        // Delete all associated cards
        await Card.deleteMany({ _id: { $in: chapter.cards } });

        // Delete the chapter
        const deletedChapter = await Chapter.findByIdAndDelete(chapterId);

        // Update the module document to remove the deleted chapter from the program array
        const updatedModule = await moduleModel.findByIdAndUpdate(
            moduleId,
            { $pull: { program: chapterId } },
            { new: true }
        );

        res.json({ deletedChapter, updatedModule });
    } catch (error) {
        // Handle any errors
        console.error('Error deleting chapter:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { editChapterName, addChapter, deleteChapter};
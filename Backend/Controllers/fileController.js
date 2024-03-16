const File = require('../models/fileSchema');
const Card = require('../models/cardSchema');

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Create a new file document using the file schema
    const newFile = new File({
        type: req.body.type,
        title: req.file.originalname,
    });

    try {
        // Save the file document to the database
        const savedFile = await newFile.save();
        console.log('Saved File:', savedFile);
        res.send(`File uploaded successfully.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file.');
    }
};
const addFileToCard = async (req, res) => {
    try {
        const { cardId } = req.params;
        const card = await Card.findById(cardId);
        if (!card) {
            return res.status(404).send('Card not found.');
        }

        // Check if the card's files array has reached the limit
        if (card.files.length >= 3) {
            return res.status(400).send('Maximum number of files reached for this card.');
        }

        // Map the file type to the appropriate enum value
        const fileTypeMap = {
            'application/pdf': 'cours', // Example: PDF files are mapped to 'cours'
            'application/vnd.ms-powerpoint': 'td', // Example: PPT files are mapped to 'td'
            // Add mappings for other file types as needed
        };

        // Get the enum value for the file type
        const fileType = fileTypeMap[req.file.mimetype];

        if (!fileType) {
            return res.status(400).send('Invalid file type.');
        }

        // Create a new File document for the uploaded file
        const newFile = new File({
            title: req.file.originalname,
            type: fileType,
            // Other file properties...
        });

        // Save the File document to the database
        const savedFile = await newFile.save();

        // Add the file ObjectId to the card's files array
        card.files.push(savedFile._id);
        await card.save();

        return res.status(201).json(card);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error adding file to card.');
    }
};
module.exports =addFileToCard;

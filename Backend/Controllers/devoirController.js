const Devoir = require('../models/devoirSchema');
const fs = require('fs').promises; // Import the fs.promises module for asynchronous file operations
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const loginTeacher = require('./Enseignant');
const loginStudent = require('./Etudiant');
const Etudiant = require('../models/etudiantSchema')
const File = require('../models/fileSchema')
const Enseignant = require('../models/enseignantSchema')
const Module = require('../models/moduleSchema')

const getAllDevoirs = async (req, res) => {
    try {
        // Find all devoirs
        const devoirs = await Devoir.find();

        res.status(200).json({ devoirs });
    } catch (error) {
        console.error('Error fetching devoirs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getDevoirsAndSubmissions= async (req,res)=>{
    try {
        const { devoirId } = req.params;

        // Find the specific devoir by its ID and populate the submittedBy field with student details
        const devoir = await Devoir.findById(devoirId)
            .populate({
                path: 'submittedBy.etudiant',
                select: 'nom prenom groupe' // Sélectionnez les champs que vous voulez récupérer du modèle Etudiant
            });

        if (!devoir) {
            return res.status(404).json({ message: 'Devoir non trouvé' });
        }

        // Extraire les détails du devoir
        const devoirName = devoir.title;
        const devoirDescription = devoir.description;
        const devoirRemiseDate = devoir.dateRemise;

        // Extraire la table submittedBy avec les infos de soumission
        const submittedByList = devoir.submittedBy.map(submission => ({
            nom: submission.etudiant ? submission.etudiant.nom : 'Inconnu',
            prenom: submission.etudiant ? submission.etudiant.prenom : 'Inconnu',
            groupe: submission.etudiant ? submission.etudiant.groupe : 'Inconnu',
            dateSoumission: submission.dateSoumission || 'Non soumis',
            fileId: submission.submittedFile // Include the ID of the submitted file
        }));

        res.status(200).json({ devoirName, devoirDescription, devoirRemiseDate, submittedByList });
    } catch (error) {
        console.error('Erreur lors de la récupération des soumissions :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}
// Controller function to get a single devoir by ID
const getDevoirById = async (req, res) => {
    const devoirId = req.params.devoirId;

    try {
        // Find the devoir by ID
        const devoir = await Devoir.findById(devoirId);

        if (!devoir) {
            return res.status(404).json({ message: 'Devoir not found' });
        }

        res.status(200).json({ devoir });
    } catch (error) {
        console.error('Error fetching devoir:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};





// Controller function to add a new devoir

async function addDevoir(req, res) {
    const { title, description, dateRemise, addedBy, module } = req.body;

    try {
        const newDevoir = new Devoir({
            title: title,
            description: description,
            dateRemise: dateRemise,
            addedBy: addedBy,
            module: module
        });

        const savedDevoir = await newDevoir.save();
        res.status(201).json(savedDevoir);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}




// Controller function to submit work as a file
const submitWork = async (req, res) => {
    const { devoirId } = req.params;
    const { userId } = req.body;
    const file = req.file; // Access uploaded file details using multer


    try {
        // Validate file upload
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
        // Find the devoir by its ID
        const devoir = await Devoir.findById(devoirId);

        if (!devoir) {
            return res.status(404).json({ message: 'Devoir not found' });
        }

        // Retrieve the etudiant information based on the provided userId
        const etudiant = await Etudiant.findById(userId);
        if (!etudiant) {
            return res.status(404).json({ message: 'Etudiant not found' });
        }
       
         // File storage logic (replace with your specific storage mechanism)
         const projectRoot = path.join(__dirname, '..'); // Go up two levels from Controllers
         
const uploadPath = path.join(projectRoot, 'uploads', file.filename);
    await fs.rename(file.path, uploadPath); // Move uploaded file (replace with your storage logic)

   
        // Construct the download link using the original filename
        
        const downloadLink = `/download/${encodeURIComponent(file.filename)}`;

        // Update the submittedBy array in the devoir object
    devoir.submittedBy.push({
        etudiant: etudiant._id,
        submittedFile: downloadLink,
        originalFileName: file.filename, // Include original filename
        dateSoumission: new Date(),
      });

        // Save the updated devoir object
        await devoir.save();

        res.status(200).json({ message: 'Devoir submitted successfully', downloadLink });
    } catch (error) {
        console.error('Error submitting devoir:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const toggleDevoirVisibility = async (req, res) => {
    try {
        const { devoirId } = req.params;
        const { visibility } = req.body;

        // Find the devoir by ID
        const devoir = await Devoir.findById(devoirId);

        if (!devoir) {
            return res.status(404).json({ success: false, message: 'Devoir not found' });
        }

        // Update the visibility of the devoir
        devoir.visibility = visibility;
        await devoir.save();

        res.status(200).json({ success: true, message: 'Devoir visibility updated successfully' });
    } catch (error) {
        console.error('Error updating devoir visibility:', error);
        res.status(500).json({ success: false, message: 'Failed to update devoir visibility' });
    }
};


const deleteDevoir = async (req, res) => {
    const devoirId = req.params.devoirId;

    try {
        // Find the devoir by its ID and delete it
        const deletedDevoir = await Devoir.findByIdAndDelete(devoirId);

        if (!deletedDevoir) {
            return res.status(404).json({ message: 'Devoir not found' });
        }

        res.status(200).json({ message: 'Devoir deleted successfully', devoir: deletedDevoir });
    } catch (error) {
        console.error('Error deleting devoir:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getDevoirsByModule = async (req, res) => {
    const { moduleId } = req.params;

    try {
        // Find all devoirs for the specified module ID that matches the given module ID
        const devoirs = await Devoir.find({ module: moduleId }).populate('submittedBy.etudiant', 'nom prenom').populate('addedBy', 'nom prenom');

        // Check if devoirs were found
        if (!devoirs) {
            return res.status(404).json({ message: 'No devoirs found for the specified module' });
        }

        // Construct the response object with file download links
        const devoirsWithLinks = devoirs.map(devoir => ({
            _id: devoir._id,
            title: devoir.title,
            description: devoir.description,
            dateRemise: devoir.dateRemise,
            submittedBy: devoir.submittedBy.map(submitted => ({
                etudiant: submitted.etudiant,
                submittedFile: submitted.submittedFile,
                dateSoumission: submitted.dateSoumission
            })),
            addedBy: devoir.addedBy,
            visibility: devoir.visibility
        }));

        // Send the response with devoirs containing file download links
        res.status(200).json(devoirsWithLinks);
    } catch (error) {
        console.error('Error fetching devoirs by module:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};










module.exports = {
    getAllDevoirs,
    getDevoirById,
    addDevoir,
    submitWork,
    deleteDevoir,
    getDevoirsAndSubmissions,
    toggleDevoirVisibility,
    getDevoirsByModule
};
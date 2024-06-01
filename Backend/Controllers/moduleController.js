const Module = require('../models/moduleSchema');
const Chapter = require('../models/chapterSchema')
const Ressource = require('../models/ressourceSchema')
const Enseignant = require('../models/enseignantSchema');
const Quizz = require('../models/quizzSchema');
// Controller function to get modules by professor ID
const getModulesByProfessor = async (req, res) => {
  const { professeurId } = req.params;
  try {
    const enseignant = await Enseignant.findById(professeurId).populate('Modules._id', 'nom icon');
    if (!enseignant) {
      return res.status(404).json({ error: "Professeur non trouvé." });
    }
    const modules = enseignant.Modules.map(module => ({
      _id: module._id._id,
      nom: module._id.nom,
      icon: module._id.icon
    }));
    res.json(modules);
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des modules enseignés." });
  }
};

// Controller function to redirect based on the role of the professor in a module
const redirectBasedOnRole = async (req, res) => {
  const { professeurId, idModule } = req.params;

  try {
    const enseignant = await Enseignant.findById(professeurId);
    if (!enseignant) {
      return res.status(404).json({ error: "Professeur non trouvé." });
    }
    const moduleEnseigne = enseignant.Modules.find(module => module._id.toString() === idModule);
    if (!moduleEnseigne) {
      return res.status(404).json({ error: "Le professeur n'enseigne pas ce module." });
    }
    const role = moduleEnseigne.estChargeCour ? "charge_cours" : "charge_td";
    
    res.json({ role });
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la redirection." });
  }
};

const addModule = async (req, res) => {
    const { nom, coef, annee, specialite, program, ressource, quizzes } = req.body; // Extract module details from the request body

    if (!nom || !coef || !annee || !specialite) {
        return res.status(400).json({ message: 'Module details are required' });
    }

    try {
        // Create a new module with the extracted details
        const newModule = new Module({
            nom,
            coef,
            annee,
            specialite,
            program: program || [], // Initialize as an empty array if not provided
            ressource: ressource || [], // Initialize as an empty array if not provided
            quizzes: quizzes || [] // Initialize as an empty array if not provided
        });

        // Save the new module to the database
        const savedModule = await newModule.save();

        // Return the created module in the response
        res.status(201).json({ message: 'Module created successfully', module: savedModule });
    } catch (error) {
        console.error('Error creating module:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
;

// Function to find modules by id
async function showModules() {
    try {
        const modules = await moduleModel.find({});
        console.log(modules)
    } catch (error) {
        console.error(error);
        
    }
}
const getModuleResources = async (req, res) => {
    const {moduleId} = req.params; // Retrieve the module ID from route parameters
  
    try {
      // Find the module by its ID and populate the 'ressource' field with full resource attributes
      const module = await Module.findById(moduleId).populate('ressource').exec();
  
      if (!module) {
        // If the module isn't found, return a 404 status code
        return res.status(404).json({ error: 'Module not found' });
      }
  
      // Return the resources associated with the module
      return res.status(200).json({
        moduleName: module.nom, // Optional: Include module-specific information
        ressources: module.ressource, // The full list of resources
      });
    } catch (error) {
      console.error('Error retrieving resources for module:', error); // Log the error
      return res.status(500).json({ error: 'An internal server error occurred' }); // Return a generic error message for unexpected errors
    }
  };



// const getChapterInformation = async (chapterId) => {
//     // const { chapterId } = req.params;

//     try {
//         // Find the chapter by its ID
//         const chapter = await Chapter.findById(chapterId).populate({
//             path: 'cards',
//             populate: {
//                 path: 'files',
//                 model: 'File'
//             }
//         });

//         if (!chapter) {
//             return res.status(404).json({ message: 'Chapter not found' });
//         }

//         // Get the chapter's name
//         const chapterName = chapter.title;

//         // Initialize an object to store grouped download links by card ID
//         const downloadLinksByCard = {};

//         // Iterate through the cards associated with the chapter
//         for (let i = 0; i < chapter.cards.length; i++) {
//             const card = chapter.cards[i];
//             const cardId = card._id;
            
//             // Initialize an array to store download links for files in this card
//             const downloadLinks = [];
            
//             // Iterate through all files associated with the card
//             for (let j = 0; j < card.files.length; j++) {
//                 const file = card.files[j];
//                 // Generate filename with extension up to the first dot occurrence
//                 const dotIndex = file.title.indexOf('.');
//                 const filenameWithExtension = dotIndex !== -1 ? file.title.substring(0, dotIndex + 4) : file.title;

//                 // Generate download link with filename and extension
//                 const downloadLink = `/download/${encodeURIComponent(filenameWithExtension)}`;

//                 // Push formatted download link to the array
//                 downloadLinks.push(downloadLink);
//             }

//             // Store download links array for this card ID
//             downloadLinksByCard[`card ${i + 1}`] = { cardId, downloadLinks };
//         }

//         // Construct the response object
//         const response = {
//             chapterName,
//             downloadLinksByCard
//         };

//         return(response)
//     } catch (error) {
//         console.error('Error retrieving chapter information:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };



const getModuleProgram = async (req, res) => {
    const moduleId = req.params.moduleId;

    try {
        const module = await Module.findById(moduleId);
        if (!module) {
            return res.status(404).json({ error: 'Module not found' });
        }

        // Fetching chapters details based on the program array
        const chaptersDetails = await Promise.all(module.program.map(async (chapterId) => {
            return chapterInfos(chapterId); // Fetch detailed information about each chapter
        }));

        res.json({
            program: chaptersDetails
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

async function chapterInfos(chapterId) {
    try {
        const chapter = await Chapter.findById(chapterId).populate({
            path: 'cards',
            populate: {
                path: 'files',
                select: 'title type url' // Continue to fetch necessary file details
            }
        });

        if (!chapter) {
            return { error: `Chapter with ID ${chapterId} not found` };
        }

        const chapterDetails = {
            chapterName: chapter.title,
            chapterId: chapter._id,
            cards: []
        };

        chapter.cards.forEach(card => {
            const cardDetails = {
                cardId: card._id,
                visibility: card.visibility, // Assuming 'visibility' is the field name in the card schema
                files: []
            };

            card.files.forEach(file => {
                // Extracting the filename and extension from the title
                const [fileName, fileExt] = file.title.split('.');
                // Constructing the download link with just the filename and extension
                const downloadLink = `/download/${encodeURIComponent(fileName)}.${fileExt}`;
                cardDetails.files.push({
                    fileId: file._id,
                    downloadLink: downloadLink,
                    fileType: file.type, // Adding file type
                    fileUrl: file.url  // Including URL if needed
                });
            });

            chapterDetails.cards.push(cardDetails);
        });

        return chapterDetails;
    } catch (error) {
        console.error(error);
        return { error: 'Internal server error' };
    }
}



//! added sprint3 
const getModuleQuizzes = async (req, res) => {
  const  moduleId  = req.params.moduleId;

  try {
      // Find the module by its ID and populate the 'quizzes' field
      const module = await Module.findById(moduleId).populate('quizzes');

      if (!module) {
          return res.status(404).json({ message: 'Module not found' });
      }

      // Extract quizzes associated with the module
      const quizzes = module.quizzes;

      res.status(200).json({ quizIds: quizzes.map(quizz => quizz._id) });

  } catch (error) {
      console.error('Error fetching quizzes:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
const getModuleQuizzesVisible= async (req, res) => {
  const moduleId = req.params.moduleId;

  try {
      // Find the module by its ID and populate the 'quizzes' field
      const module = await Module.findById(moduleId).populate('quizzes');

      if (!module) {
          return res.status(404).json({ message: 'Module not found' });
      }

      // Filter visible quizzes associated with the module
      const visibleQuizzes = module.quizzes.filter(quizz => quizz.visibility === true);

      // Extract IDs of visible quizzes
      const visibleQuizzIds = visibleQuizzes.map(quizz => quizz._id);

      res.status(200).json({ quizIds: visibleQuizzIds });
  } catch (error) {
      console.error('Error fetching quizzes:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
const deleteQuizz = async (req, res) => {
  const { moduleId, quizzId } = req.params;

  try {
      // Find the module by its ID
      const module = await Module.findById(moduleId);
      if (!module) {
          return res.status(404).json({ message: 'Module not found' });
      }

      // Find the quizz by its ID
      const quizz = await Quizz.findById(quizzId);
      if (!quizz) {
          return res.status(404).json({ message: 'Quizz not found' });
      }

      // Remove the quizz from the quizzes collection
      await Quizz.findByIdAndDelete(quizzId);

      // Remove the quizz reference from the module
      module.quizzes = module.quizzes.filter(q => q.toString() !== quizzId);
      await module.save();

      res.status(200).json({ message: 'Quizz deleted successfully' });
  } catch (error) {
      console.error('Error deleting quizz:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};





const addModuleResource = async (req, res) => {
    const moduleId = req.params.moduleId;
    const { title, description, url } = req.body;

    try {
        // Create a new resource object
        const newRessource = new Ressource({
            title: title,
            description: description,
            url: url
        });

        // Save the resource to the database
        const savedRessource = await newRessource.save();

        // Find the module by ID
        const module = await Module.findById(moduleId);

        // Add the resource to the module's list of resources
        module.ressource.push(savedRessource._id);

        // Save the updated module
        const updatedModule = await module.save();

        res.status(201).json(updatedModule);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding resource to module.');
    }
};
const getAllModules = async (req, res) => {
    try {
        // Fetch all modules from the database
        const modules = await Module.find({}, '_id nom');

        // If no modules found, send 404
        if (!modules || modules.length === 0) {
            return res.status(404).json({ message: 'No modules found' });
        }

        // Send the list of modules
        res.status(200).json(modules);
    } catch (error) {
        console.error('Error fetching modules:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports={
    getModulesByProfessor,
    redirectBasedOnRole,
    addModule,
    showModules,
    getModuleResources,
    getModuleProgram,
    addModuleResource,
    getModuleQuizzes,
    getModuleQuizzesVisible,
    deleteQuizz,
    getAllModules
}
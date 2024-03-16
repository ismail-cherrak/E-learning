const Module = require('../models/moduleSchema');
const Ressource = require('../models/ressourceSchema')
const addModule = async (infos_module) => {
    try {
        return await moduleModel.create(infos_module);
    } catch (error) {
        throw new Error('Error adding module: ' + error.message);
    }
};

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
    const moduleId = req.params.moduleId;

    try {
        // Find the module by its ID
        const module = await Module.findById(moduleId).populate('ressources');

        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        // Extract and return the resources associated with the module
        const resources = module.ressources;
        res.json({ resources });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching module resources' });
    }
};
const getModuleProgram = async (req, res) => {
    const moduleId = req.params.moduleId; // Extract module ID from request parameters

    try {
        const module = await Module.findById(moduleId).populate('program');
        
        if (!module) {
            return res.status(404).json({ error: 'Module not found' });
        }

        
        res.json({ program: module.program });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
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

module.exports={
    addModule,
    showModules,
    getModuleResources,
    getModuleProgram,
    addModuleResource
}
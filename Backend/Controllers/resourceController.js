const Ressource = require('../models/ressourceSchema');
const moduleModel = require('../models/moduleSchema');


// Controller function to get all resources
const getAllResources = async (req, res) => {
    try {
        // Find all resources
        const resources = await Ressource.find();

        res.status(200).json({ resources });
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to get a single resource by ID
const getResourceById = async (req, res) => {
    const resourceId = req.params.resourceId;

    try {
        // Find the resource by ID
        const resource = await Ressource.findById(resourceId);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.status(200).json({ resource });
    } catch (error) {
        console.error('Error fetching resource:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getResourcesByModule = async (req, res) => {
    const moduleId = req.params.moduleId;

    try {
        // Find the module by ID and populate its resources
        const module = await moduleModel.findById(moduleId).populate('ressource');

        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        // Extract resources from the module
        const resources = module.ressource;

        res.status(200).json({ resources });
    } catch (error) {
        console.error('Error fetching resources by module:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const addRessource = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const { title, description, type, fileOrUrl } = req.body;

        const moduleObj = await moduleModel.findById(moduleId)
    // console.log(moduleObj)

    if(!moduleObj){
        throw Error('module not found')
    }

        if  (type === 'url') {
            const newResource = new Ressource({
                title,
                description,
                type,
                url: fileOrUrl
            });

             await newResource.save();
            moduleObj.ressource.push(newResource);
            await moduleObj.save();


            res.status(201).json({ success: true, message: 'Resource added successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid resource type' });
        }
    } catch (error) {
        console.error('Error adding resource:', error);
        res.status(500).json({ success: false, message: 'Failed to add resource' });
    }
};
const deleteResource = async (req, res) => {
    const resourceId = req.params.resourceId;

    try {
        // Find the resource by its ID and delete it
        const deletedResource = await Ressource.findByIdAndDelete(resourceId);

        if (!deletedResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.status(200).json({ message: 'Resource deleted successfully', resource: deletedResource });
    } catch (error) {
        console.error('Error deleting resource:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = {
    getAllResources,
    getResourceById,
    addRessource,
    deleteResource,
    getResourcesByModule
};

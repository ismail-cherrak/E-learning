const jwt = require('jsonwebtoken');
const express = require('express');
const enseignant = require('../models/enseignantSchema');
const mod = require('../models/moduleSchema')
const mongoose = require('mongoose');

async function loginTeacher(req, res) {
    try {
        const { _id} = req.body;
        const teacher = await enseignant.findOne({ _id });
        if (!teacher) {
            return res.status(401).json({ message: 'Invalid ' });
        }

        const token = createTeacherToken(teacher._id);
        res.json({ token });
    } catch (error) {
        console.error('Error during teacher login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// Create token function charger de cour 
// const createTeacherToken = (_id) => {
//     const payload = {
//         sub: _id,
//         role: 'chargeCour' 
//     }
//     return jwt.sign(payload, process.env.SECRET, { expiresIn: '3d' });
// };
async function addEnseignant(donnee_enseignant) {
    try {
        const user_id = req.user._id
        const newEnseignant = await enseignant.create({donnee_enseignant, user_id});
        return newEnseignant;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

const getModulesByProfessorId = async (req, res) => {
    try {
        const { id } = req.params;
        const professor = await enseignant.findById(id);

        if (!professor) {
            return res.status(404).json({ message: "Professor not found" });
        }

        // Extract the module IDs from the output of the first function
        const moduleIds = professor.Modules.map(module => module._id);

        // Query the moduleModel to retrieve modules by IDs
        const modules = await mod.find({ _id: { $in: moduleIds } });


        res.status(200).json(modules); // Return the modules
        console.log(res.status)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const redirect=async(req,res)=>{
    try {
        const { idprof,idmod } = req.params;
        const professor = await enseignant.findById(idprof);

        if (!professor) {
            return res.status(404).json({ message: "Professor not found" });
        }

        // Extract the module IDs from the output of the first function
        const moduleIds = professor.Modules // Return the modules
        const mm = moduleIds.filter(m => m._id == idmod  )
        let role
        mm[0].estChargeCour ? role='chargeCours' : role='chargeTd'
        res.status(200).json(role)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Controller.js


async function affecterModuleProf(req, res) {
    const { enseignantId, moduleId, estChargeCour } = req.body;

    try {
        // Recherche de l'enseignant par ID
        const enseignantTrouve = await enseignant.findById(enseignantId);
        
        if (!enseignantTrouve) {
            return res.status(404).json({ message: "Enseignant non trouvé." });
        }

        // Vérification si le module existe déjà dans la liste des modules de l'enseignant
        const moduleExistant = enseignantTrouve.Modules.find(module => module._id.equals(moduleId));
        
        if (moduleExistant) {
            // Si le module existe déjà, mettez à jour estChargeCour
            moduleExistant.estChargeCour = estChargeCour;
        } else {
            // Sinon, ajoutez le nouveau module à la liste
            enseignantTrouve.Modules.push({
                _id: moduleId,
                estChargeCour: estChargeCour
            });
        }

        // Enregistrez les modifications apportées à l'enseignant
        await enseignantTrouve.save();
        
        return res.status(200).json({ message: "Module affecté avec succès à l'enseignant." });
    } catch (error) {
        console.error("Erreur lors de l'affectation du module à l'enseignant :", error.message);
        return res.status(500).json({ message: "Erreur lors de l'affectation du module à l'enseignant." });
    }
};



async function toggleEstChargeCour(req, res) {
    const { enseignantId, moduleId } = req.body;

    try {
        // Recherche de l'enseignant par ID
        const ens = await enseignant.findById(enseignantId);
        
        if (!ens) {
            return res.status(404).json({ message: "Enseignant non trouvé." });
        }

        // Vérification si le module existe dans la liste des modules de l'enseignant
        const moduleToToggle = ens.Modules.find(module => module._id.equals(moduleId));
        
        if (!moduleToToggle) {
            return res.status(404).json({ message: "Module non trouvé pour cet enseignant." });
        }

        // Toggle the estChargeCour value
        moduleToToggle.estChargeCour = !moduleToToggle.estChargeCour;

        // Enregistrez les modifications apportées à l'enseignant
        await ens.save();
        
        return res.status(200).json({ message: "Rôle du professeur mis à jour avec succès." });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du rôle du professeur :", error.message);
        return res.status(500).json({ message: "Erreur lors de la mise à jour du rôle du professeur." });
    }
}

async function deleteModuleProf(req, res) {
    const { enseignantId, moduleId } = req.body;

    try {
        // Recherche de l'enseignant par ID
        const ens = await enseignant.findById(enseignantId);
        
        if (!ens) {
            return res.status(404).json({ message: "Enseignant non trouvé." });
        }

        // Vérification si le module existe dans la liste des modules de l'enseignant
        const moduleIndex = ens.Modules.findIndex(module => module._id.equals(moduleId));
        
        if (moduleIndex === -1) {
            return res.status(404).json({ message: "Module non trouvé pour cet enseignant." });
        }

        // Suppression du module de la liste des modules de l'enseignant
        ens.Modules.splice(moduleIndex, 1);

        // Enregistrez les modifications apportées à l'enseignant
        await ens.save();
        
        return res.status(200).json({ message: "Module supprimé avec succès de l'enseignant." });
    } catch (error) {
        console.error("Erreur lors de la suppression du module de l'enseignant :", error.message);
        return res.status(500).json({ message: "Erreur lors de la suppression du module de l'enseignant." });
    }
}
const afficherEnseignants = async (req, res) => {
    try {
        const enseignants = await enseignant.find({}, '_id nom prenom');

        if (!enseignants || enseignants.length === 0) {
            return res.status(404).json({ message: 'No enseignants found' });
        }

        res.status(200).json(enseignants);
    } catch (error) {
        console.error('Error fetching enseignants:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const supprimerEnseignant = async (req, res) => {
    const { id } = req.body; // Retrieve enseignant ID from the request body

    try {
        // Delete enseignant from the 'enseignant' collection
        const deletedEnseignant = await enseignant.findByIdAndDelete(id);
        if (!deletedEnseignant) {
            return res.status(404).json({ message: 'Enseignant not found' });
        }

        // Also delete the enseignant from the 'authentication' collection
        await auth.deleteOne({ user_id: id });

        res.status(200).json({ message: 'Enseignant deleted successfully' });
    } catch (error) {
        console.error('Error deleting enseignant:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};










module.exports = {
    addEnseignant ,
     loginTeacher,
     getModulesByProfessorId,
     redirect,affecterModuleProf ,
     toggleEstChargeCour,
     deleteModuleProf,
     afficherEnseignants,
     supprimerEnseignant

    }

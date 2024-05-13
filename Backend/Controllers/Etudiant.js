const express = require('express');
const etudiant = require('../models/etudiantSchema');
const jwt = require('jsonwebtoken');
const Module = require('../models/moduleSchema')
const fs = require('fs')
const csv = require('csv-parser')
const bcrypt = require('bcrypt');
const Auth = require('../models/AuthenticationSchema')
async function loginStudent(req, res) {
    try {
        const { _id } = req.body;
        const student = await etudiant.findOne({ _id });
        if (!student) {
            return res.status(401).json({ message: 'Invalid ' });
        }

        const token = createStudentToken(student._id);
        res.json({ token });
    } catch (error) {
        console.error('Error during student login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// Create token function etudiant
const createStudentToken = (_id) => {
    const payload = {
        sub: _id,
        role: 'etudiant' 
    }
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '3d' });
};
const getStudentModulesById = async (req, res) => {
    try {
        const { etudiantId } = req.params;
        const student = await etudiant.findById(etudiantId); // Assuming you have a model named Etudiant
        
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // Assuming you have a model named Module to represent modules
        const modules = await Module.find({
            specialite: student.specialite,
            year: student.year
        });

        if (!modules) {
            return res.status(404).json({ success: false, message: 'No modules found for the student' });
        }

        // Format the response to include module details
        const formattedModules = modules.map(module => ({
            _id: module._id,
            name: module.nom, // Assuming you have a 'name' field in your module schema
            icon: module.icon // Assuming you have an 'icon' field in your module schema
        }));

        res.status(200).json({ success: true, modules: formattedModules });
    } catch (error) {
        console.error('Error fetching modules:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



const addEtudiant = async (donnee_etudiant) => {
    try {
        return await etudiant.create(donnee_etudiant);
    } catch (error) {
        throw new Error('Error adding etudiant: ' + error.message);
    }
};
const addStudentsFromCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const students = [];

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', async (data) => {
                try {
                    // Authenticate the student
                    const defaultPassword = `${data.nom}${data.groupe}`; // Default password
                    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
                    const authUser = new Auth({
                        email: data.email,
                        password: hashedPassword,
                        type: 'Etudiant'
                    });
                    const createdAuthUser = await authUser.save();

                    // Create student document
                    const student = new etudiant({
                        nom: data.nom,
                        prenom: data.prenom,
                        email: data.email,
                        year: data.year,
                        specialite: data.specialite,
                        groupe: data.groupe,
                        user_id: createdAuthUser._id // Link to the authentication document
                    });
                    await student.save(); // Save the student document
                    students.push(student);
                } catch (error) {
                    console.error('Error creating student:', error);
                }
            })
            .on('end', async () => {
                // Delete the CSV file after adding students to the database
                fs.unlinkSync(req.file.path);

                res.status(201).json({ message: 'Students added successfully' });
            });
    } catch (error) {
        console.error('Error adding students from CSV:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteAllStudents = async (req, res) => {
    try {
        // Delete all students from the 'etudiant' collection
        await etudiant.deleteMany();

        // Also delete all students from the 'authentication' collection
        await Auth.deleteMany({ type: 'Etudiant' });

        res.status(200).json({ message: 'All students deleted successfully' });
    } catch (error) {
        console.error('Error deleting all students:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

    module.exports = {addEtudiant,loginStudent,getStudentModulesById,addStudentsFromCSV,deleteAllStudents} ;

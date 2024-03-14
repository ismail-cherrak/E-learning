const express = require('express');
const moduleModel = require('../models/moduleSchema');
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

module.exports = {
    addModule,
    showModules
};
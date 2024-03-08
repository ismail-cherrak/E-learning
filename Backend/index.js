const express = require('express');
const app = express();
const connectDB = require('./Controllers/db');
const etuController = require('./Controllers/Etudiant');
const adminController = require('./Controllers/Admin');
const authController = require('./Controllers/Auth');
const moduleController = require('./Controllers/Module')
const ensController = require('./Controllers/Enseignant');
const { ObjectId } = require('mongodb');
connectDB();
ensController.addEnseignant({
    nom: 'Boudihir',
    prenom: 'elarbi',
    email: 'e.boudihir@esi-sba.dz',
    Modules: [{_id:new ObjectId('65eb4a528f813a7eb58961e2'),estChargeCour:true}]
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

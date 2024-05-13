const express = require('express');
const moduleController = require('../Controllers/moduleController');
const authMiddleware =require('../middleware/requireAuth');
const loginTeacher = require ('../Controllers/Enseignant')
const jwt = require('jsonwebtoken');
const router = express.Router()


// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(401).json({ error: 'Token non fourni' });
  
//     jwt.verify(token, process.env.SECRET, (err, decoded) => {
//       if (err) return res.status(401).json({ error: 'Token invalide' });
//       if (decoded.role !== 'Prof') return res.status(403).json({ error: 'Accès non autorisé' });
//       req.user = decoded;
//       next();
//     });
//   };


// // require auth for all workout routes
// router.use(requireAuth);
router.post("/loginTeacher",  loginTeacher.loginTeacher);


// Route to get modules by professor ID
router.get('/:id',loginTeacher.getModulesByProfessorId)
router.get('/:idprof/:idmod',loginTeacher.redirect)

router.post('/affecterModuleProf', loginTeacher.affecterModuleProf);
router.post('/toggleEstChargeCour', loginTeacher.toggleEstChargeCour);
router.post('/deleteModuleProf', loginTeacher.deleteModuleProf);

router.get('/', loginTeacher.afficherEnseignants);
router.delete('/', loginTeacher.supprimerEnseignant);



// Route to redirect based on the role of the professor in a module
//router.get('/redirect/:professeurId/:idModule', /*authMiddleware,*/ moduleController.redirectBasedOnRole);

module.exports = router
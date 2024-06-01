const express = require('express');
const authMiddleware =require('../middleware/requireAuth');
const loginStudent = require ('../Controllers/Etudiant');
const router = express.Router()
const uploadCSV = require('../middleware/csvUploadMiddleware')


router.post("/loginStudent",  loginStudent.loginStudent);
router.get("/:etudiantId/modules", loginStudent.getStudentModulesById);

router.post("/uploadcsv", uploadCSV.single('file'), loginStudent.addStudentsFromCSV);
router.delete('/', loginStudent.deleteAllStudents); // Handle DELETE request to delete all students

module.exports = router
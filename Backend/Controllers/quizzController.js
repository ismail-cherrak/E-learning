const Quizz = require('../models/quizzSchema');
const Module = require('../models/moduleSchema');
const Enseignant = require('../models/enseignantSchema');
const Etudiant = require('../models/etudiantSchema');

const getAllQuizzes = async (req, res) => {
    try {
        // Find all quizzes
        const quizzes = await Quizz.find();

        res.status(200).json({ quizzes });
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllVisibleQuizzes = async (req, res) => {
    try {
        // Find quizzes where visibility is true
        const visibleQuizzes = await Quizz.find({ visibility: true });

        res.status(200).json({ quizzes: visibleQuizzes });
    } catch (error) {
        console.error('Error fetching visible quizzes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Controller function to get a single quiz by ID
const getQuizById = async (req, res) => {
    const quizId = req.params.quizId;
    

    try {
        // Find the quiz by ID
        const quiz = await Quizz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json({ quiz });
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const addQuiz = async (req, res) => {
    const moduleId = req.params.moduleId;
    const moduleObj = await Module.findById(moduleId);
    if (!moduleObj) {
        return res.status(404).json({ message: 'Module not found' });
    }

    const {
        titre,
        questions,
        dateDepot,
        addedBy
    } = req.body;
    const visibility = true;
    const nbrQst = questions.length;


    // Validate that each question has exactly four options
    const hasValidOptions = questions.every(question => question.options.length === 4);

    if (!hasValidOptions) {
        return res.status(400).json({ message: "Each question must have exactly four options" });
    }

    try {
        // Create the quiz
        const quiz = await Quizz.create({
            titre,
            nbrQst,
            questions,
            dateDepot,
            addedBy,
            visibility
        });
         // Add the quizz reference to the module
         moduleObj.quizzes.push(quiz._id);

         // Save the updated module
         await moduleObj.save();

        res.status(201).json({ quiz });
    } catch (error) {
        console.error('Error adding quiz:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to calculate the score percentage of the quiz
const calculateQuizScorePercentage = (quiz, chosenOptions) => {
    let totalScore = 0;

    // Iterate over each question in the quiz
    for (let i = 0; i < quiz.questions.length; i++) {
        const question = quiz.questions[i];
        const correctOptionIndex = question.options.findIndex(option => option.value === true);
       // console.log(correctOptionIndex);

        // Check if the student's chosen options match the correct options
        const studentChosenOptions = chosenOptions[i];
        const isCorrect = studentChosenOptions.includes(correctOptionIndex);

        // Increment the total score if the answer is correct
        if (isCorrect) {
            totalScore++;
        }
    }

    // Calculate the percentage score and round it to two decimal places
    const percentageScore = ((totalScore / quiz.questions.length) * 100).toFixed(2);

    return percentageScore;
};


// Submit quiz function
const submitQuizz = async (req, res) => {
    const quizId = req.params.quizId;
    const { studentId, chosenOptions } = req.body;

    try {
        // Find the quiz by ID
        const quiz = await Quizz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        
        // Calculate the score percentage of the quiz
        const scorePercentage = calculateQuizScorePercentage(quiz, chosenOptions);

        // Save the submitted quiz with the student's score percentage
        quiz.submittedBy.push({ etudiant: studentId, noteEtudiant: scorePercentage });
        await quiz.save();

        res.status(200).json({ quiz });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getAllSubmittedWork = async (req, res) => {
    const quizId = req.params.quizId;

    try {
        // Find the quiz by ID
        const quiz = await Quizz.findById(quizId).populate('submittedBy.etudiant');

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Extract submitted work information including student's name, group, and date of submission
        const submittedWork = quiz.submittedBy.map(submission => ({
            nom: submission.etudiant.nom,
            prenom: submission.etudiant.prenom,
            groupe: submission.etudiant.groupe,
            dateDeRemise: submission.dateSoumission.toISOString(), // Convert date to ISO string
            note: submission.noteEtudiant
        }));

        res.status(200).json({ submittedWork });
    } catch (error) {
        console.error('Error fetching submitted work:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const addQuestion = async (req, res) => {
    const quizId = req.params.quizId;
    const { enonce, options } = req.body;
    const nbrQst = questions.length;



    try {
        // Find the quiz by ID
        const quiz = await Quizz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Validate request body
        if (!enonce || !options || !Array.isArray(options) || options.length !== 4) {
            return res.status(400).json({ message: 'Invalid request body' });
        }

        // Create a new question
        const question = { enonce, options };

        // Add the question to the quiz
        quiz.questions.push(question);

        // Save the updated quiz
        await quiz.save();

        res.status(201).json({ question });
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const toggleQuizzVisibility = async (req, res) => {
    const quizzId = req.params.quizzId;

    try {
        // Find the quizz by its ID
        const quizz = await Quizz.findById(quizzId);
        if (!quizz) {
            return res.status(404).json({ message: 'Quizz not found' });
        }
        // Toggle the visibility
        quizz.visibility = !quizz.visibility;
        // Save the updated quizz
        const updatedQuizz = await quizz.save();
        res.status(200).json({ quizz: updatedQuizz });
    } catch (error) {
        console.error('Error toggling quizz visibility:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteQuizz = async (req, res) => {
    const quizzId = req.params.quizzId;

    try {
        // Find the quizz by its ID and delete it
        const deletedQuizz = await Quizz.findByIdAndDelete(quizzId);

        if (!deletedQuizz) {
            return res.status(404).json({ message: 'Quizz not found' });
        }

        res.status(200).json({ message: 'Quizz deleted successfully', quizz: deletedQuizz });
    } catch (error) {
        console.error('Error deleting quizz:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getModuleQuizzes = async (req, res) => {
    const { moduleId } = req.params;

    try {
        // Find the module by its ID
        const module = await Module.findById(moduleId).populate('quizzes');

        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        // Extract quizzes associated with the module
        const quizzes = module.quizzes;

        // Populate additional fields for each quiz
        const quizzesWithDetails = await Promise.all(quizzes.map(async (quiz) => {
            // Populate 'addedBy' field to get enseignant details
            const addedBy = await Enseignant.findById(quiz.addedBy, 'nom prenom');

            // Populate 'submittedBy.etudiant' field to get etudiant details
            const submittedByWithDetails = await Promise.all(quiz.submittedBy.map(async (submission) => {
                const etudiant = await Etudiant.findById(submission.etudiant, 'nom prenom');
                return {
                    etudiant: etudiant,
                    noteEtudiant: submission.noteEtudiant,
                    dateSoumission: submission.dateSoumission
                };
            }));

            return {
                _id: quiz._id,
                titre: quiz.titre,
                nbrQst: quiz.nbrQst,
                questions: quiz.questions,
                dateDepot: quiz.dateDepot,
                addedBy: addedBy,
                submittedBy: submittedByWithDetails,
                visibility: quiz.visibility
            };
        }));

        res.status(200).json({ quizzes: quizzesWithDetails });
    } catch (error) {
        console.error('Error fetching module quizzes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};






module.exports = {
    getAllQuizzes,
    getAllVisibleQuizzes,
    getQuizById,
    addQuiz,
    submitQuizz,
    getAllSubmittedWork,
    addQuestion,
    toggleQuizzVisibility,
    deleteQuizz,
    getModuleQuizzes
};
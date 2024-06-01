require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Added CORS middleware
const app = express();
const mongoose = require('mongoose');



const authRoute = require('./routers/authRouter');
const enseignant = require('./routers/enseignant');

const connectDB = require('./Controllers/db');
const etuController = require('./Controllers/Etudiant');
const adminController = require('./Controllers/Admin');
const authController = require('./Controllers/Auth');
const moduleController = require('./Controllers/moduleController')
const ensController = require('./Controllers/Enseignant');
const { ObjectId } = require('mongodb');
const uploadRoute = require('./routers/uploadFile')
const downloadRoute = require('./routers/downloadFile')
const moduleRoute = require('./routers/moduleRoute')
const cardRoute = require('./routers/cardRouter')
const chapterRoute = require('./routers/chapterRouter')
const resourceRoute = require('./routers/resourceRouter')
const devoirRoute = require('./routers/devoirRoutes')
const etudiantRoute = require('./routers/etudiant')
const quizzRoute = require('./routers/quizzRouter')
const forumRoute = require('./routers/forumRoute')
app.use(express.json());
app.use(cors()); // Use CORS middleware

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose.set('strictQuery', true);


// Routes
app.use("/auth", authRoute);
app.use("/enseignant", enseignant);
app.use('/upload', uploadRoute);
app.use('/download', downloadRoute);
app.use('/module',moduleRoute)
app.use('/card',cardRoute)
app.use('/chapter',chapterRoute)
app.use('/resource',resourceRoute)
app.use('/devoir',devoirRoute)
app.use('/etudiant', etudiantRoute)
app.use('/quizz', quizzRoute)
app.use('/forum',forumRoute)
// Connect to the database
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = authRoute;

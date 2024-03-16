require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Added CORS middleware
const app = express();
const homePage = require('./routers/enseignant');
const authRoute = require('./routers/authRouter');
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
app.use(express.json());
app.use(cors()); // Use CORS middleware

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/auth", authRoute);
app.use("/homePage", homePage);
app.use('/upload', uploadRoute);
app.use('/download', downloadRoute);
app.use('/module',moduleRoute)
app.use('/card',cardRoute)
app.use('/chapter',chapterRoute)
// Connect to the database
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = authRoute;

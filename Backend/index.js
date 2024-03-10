require('dotenv').config();
const express = require('express');
// express app
const app = express();
const homePage = require('./routers/enseignant');
const authRoute = require('./routers/authRouter');
const connectDB = require('./Controllers/db');
const etuController = require('./Controllers/Etudiant');
const adminController = require('./Controllers/Admin');
const authController = require('./Controllers/Auth');
const moduleController = require('./Controllers/Module')
const ensController = require('./Controllers/Enseignant');
const { ObjectId } = require('mongodb');
//const router = require('./routers/login');

// middleware
app.use(express.json());


  app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
  });

//routes 
app.use("/auth" , authRoute);
app.use("/homePage" , homePage);


// connect to db 
connectDB();



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = authRoute ;
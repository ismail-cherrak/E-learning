const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();


const app = express()
const dburl = 'mongodb+srv://ismail:ismail123@cluster0.jrbw3q3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(dburl)
    .then(() => {
        console.log('connected to db')
    })
    .catch(err => { console.log(err) })


app.listen(4000, () => {
    console.log('listening on port 4000')
})
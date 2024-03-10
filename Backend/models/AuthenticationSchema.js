const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:false
    }
});  

// static signup method
authSchema.statics.signup = async function(email, password,type) {

    // validation
    if (!email || !password ||!type) {
      throw Error('All fields must be filled')
    };
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough (use upper/lower case and some symboles)')
      }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    };
    if (!((type ==="Etudiant")||(type ==="Enseignant")||(type ==="Admin"))) {
      throw Error('Type not valid')
    };
  
    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email already in use')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  
    const user = await this.create({ email, password: hash,type })
  
    return user
  }

// static login method
authSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ email })
    // if (!user) {
    //   throw Error('Email or password incorrect')
    // }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match || !user) {
      throw Error('Email or password incorrect')
    }
  
    return user
  }
const UserModel= mongoose.model('authentication',authSchema);
module.exports =UserModel;
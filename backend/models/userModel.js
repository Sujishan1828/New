const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true,'Please enter FirstName'] 
  },
  lastname: {
    type: String,
    required: [true,'Please enter LastName']
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: [320, 'Email cannot exceed 320 characters'],
    validate: [validator.isEmail, 'Please enter valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: [8, 'Password must be at least 8 characters'],
    maxlength: [15, 'Password cannot exceed 15 characters'],
    select:false,
    validate: {
      validator: function (val) {
        // Must contain uppercase, lowercase, number, and special character
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(val);
      },
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  },
  phone: {
    type: String,
    required: [true, 'Please enter PhoneNo'],
    trim: true,

    validate: {
      validator: function (val) {
        // Matches Sri Lankan numbers: +94xxxxxxxxx or 0xxxxxxxxx
        return /^(\+94|0)?[1-9][0-9]{8}$/.test(val);
      },
      message: 'Please enter a valid phone number'
    }
  },

  address: {
    type: String,
    required: [true, 'Please enter address'],
  },

  avatar: {
    type: String,
    default: "https://via.placeholder.com/150"
   
  },

  role :{
    type: String,
    default: 'user'
  },

  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,

  googleId: {
    type: String
  }, // For Google login

  facebookId: {
    type: String
  }, // For Facebook login

},{timestamps:true});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12); // Salt rounds = 12
  next();
});

//get jwt
userSchema.methods.getJwtToken = function(){
  return jwt.sign({id:this.id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE_TIME
  })
}


//checking valid password
userSchema.methods.isValidPassword = async function(newPassword){
  return bcrypt.compare(newPassword,this.password);
}


userSchema.methods.getResetToken = function(){
  //Generate Token
   const token = crypto.randomBytes(20).toString('hex');

   //Generate Hash and set to resetPasswordToken
   this.resetPasswordToken =  crypto.createHash('sha256').update(token).digest('hex');

   //Set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    return token


}


const userModel = mongoose.model('User',userSchema);
module.exports = userModel;
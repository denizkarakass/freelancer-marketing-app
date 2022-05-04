const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required:true },
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    fiyat: {type: Number,},
    role:{type: String, enum:["freelancer","isveren","admin"],default:"isveren"},
    jobs:[{type:mongoose.Schema.Types.ObjectId, ref:'Job'}],
    createdAt:{type:Date, default:Date.now },
  });



  UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
  
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
  });


  
  const User = mongoose.model('User', UserSchema);

  module.exports = User;
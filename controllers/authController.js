const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
const Job = require("../models/Job");
const Freelancer = require("../models/Freelancer");
const User = require('../models/User');
const Category = require('../models/Category');



exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login')
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors);
    console.log(errors.array()[0].msg);

    for(let i=0; i<errors.array().length; i++){
      req.flash('error', `${errors.array()[i].msg} `);
    }
    res.status(400).redirect('/register')
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

     User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            req.session.userID = user._id;
            res.status(200).redirect("/users/dashboard");
          }else{
            req.flash('error', "Şifreniz doğru değil!");
            res.status(400).redirect("/login");
          }
        });
      }else{
        req.flash('error', "Kullanıcı bulunamadı. Emaili değiştiriniz!");
            res.status(400).redirect("/login");
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(()=> {
    res.redirect('/');
  })
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id:req.session.userID}).populate('jobs');
  const jobs = await Job.find({user:req.session.userID});
  const categories = await Category.find();
  const users = await User.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    jobs,
    users,
  });
};



exports.deleteUser = async (req, res) => {
  try {    

    await User.findByIdAndRemove(req.params.id)
    await Job.deleteMany({user:req.params.id})

    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};



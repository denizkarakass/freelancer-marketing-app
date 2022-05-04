const Category = require('../models/Category');
const User = require('../models/User');
const Job = require('../models/Job');
const Freelancer = require('../models/Freelancer');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');


exports.getIndexPage = async (req, res) => {
  const categories =  await Category.find();
  const user = await User.findOne({_id:req.session.userID});
  res.status(200).render("index", {
    page_name: "index",
    categories ,
    user,
  });
};

exports.getAboutPage = async (req, res) => {
  const user = await User.findOne({_id:req.session.userID});
  const categories =  await Category.find();
    res.status(200).render("about", {
      page_name: "about",
      user,
      categories,
    });
  };

  exports.getJobPage = async (req, res) => {
    const categories =  await Category.find();
    res.status(200).render("jobs", {
      page_name: "jobs",
      categories
    });
  };

  exports.getFreelancerPage = async (req, res) => {
    const categories =  await Category.find();
    res.status(200).render("freelancers", {
      page_name: "freelancers",
      categories
    });
  };

  exports.getRegisterPage = (req, res) => {
    res.status(200).render("register", {
      page_name: "register",
    });
  };
  
  exports.getLoginPage = (req, res) => {
    res.status(200).render("login", {
      page_name: "login",
    });
  };

  exports.getAddProjePage = async (req, res) => {
    const user = await User.findOne({_id:req.session.userID})
    const categories =  await Category.find();
    const jobs =  await Job.find();
    res.status(200).render("addProje", {
      page_name: "addProje",
      user,
      categories,
      jobs,
    });
  };

  exports.getUpdateProjePage = async (req, res) => {
    const user = await User.findOne({_id:req.session.userID})
    const categories =  await Category.find();
    const jobs =  await Job.find();
    res.status(200).render("updateProje", {
      page_name: "updateProje",
      user,
      categories,
      jobs,
    });
  };

  exports.getAddFreePage = async (req, res) => {
    const user = await User.findOne({_id:req.session.userID})
    const categories =  await Category.find();
    const freelancers =  await Freelancer.find();
    res.status(200).render("addFree", {
      page_name: "addFree",
      categories,
      freelancers,
      user
    });
  };


  exports.getAddCategoryPage = async (req, res) => {
    const user = await User.findOne({_id:req.session.userID})
    const categories =  await Category.find();
    const jobs =  await Job.find();
    res.status(200).render("addCategory", {
      page_name: "addCategory",
      user,
      categories,
      jobs,
    });
  };

  exports.getAddSubCategoryPage = async (req, res) => {
    const user = await User.findOne({_id:req.session.userID})
    const categories =  await Category.find();
    const jobs =  await Job.find();
    res.status(200).render("addCategory", {
      page_name: "addCategory",
      user,
      categories,
      jobs,
    });
  };


  exports.getMessagePage = async (req, res) => {
    const categories =  await Category.find();
    const user = await User.findOne({_id:req.session.userID});
    const users = await User.find();
    const messages =  await Message.find();
    const conversations =  await Conversation.find();
    res.status(200).render("message", {
      page_name: "message",
      categories ,
      user,
      users,
      messages,
      conversations
    });
  };
  
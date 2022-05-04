const Freelancer = require("../models/Freelancer");
const Category = require("../models/Category");
const User = require('../models/User');



exports.createFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.create(req.body);

    req.flash("success",`İlanınız platfomda yayına alındı.`)
    res.status(201).redirect('/freelancers');
  } catch (error) {
    res.status(400)
    req.flash("error",`Birşeyler yanlış gitti.... Not: 2.kez ilan veremezsiniz.`)
    res.status(400).redirect('/freelancers');
  }
};

exports.getAllFreelancers = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const query = req.query.search;

    const category = await Category.findOne({slug:categorySlug})

    let filter = {};
    if(categorySlug){
     filter = {category:category._id}
    }
 
    if(query){
      filter = {name:query}
    }
 
    if(!query && !categorySlug){
      filter.name= "",
      filter.category = null
    }
 

    
    const freelancers = await Freelancer.find({
      $or:[
        {name: {$regex: '.*' + filter.name + '.*', $options: 'i'}},
        {category:filter.category}
      ]
    });

    const categories = await Category.find();
    const user = await User.findOne({_id:req.session.userID})

    res.status(200).render('freelancers',{
      freelancers,
      categories,
      page_name:'freelancers',
      user,
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getFreelancer = async (req, res) => {
  try {
    const categories =  await Category.find();
    const user = await User.findById(req.session.userID);
    const freelancer = await Freelancer.findOne({slug: req.params.slug});
    res.status(200).render('freelancer',{
      freelancer,
      page_name:'freelancers',
      user,
      categories,
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};



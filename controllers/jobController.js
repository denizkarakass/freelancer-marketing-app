const Job = require("../models/Job");
const Category = require("../models/Category");
const User = require("../models/User");



exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      fiyat: req.body.fiyat,
      isveren: req.body.isveren,
      user: req.session.userID
    }
    );
    
    req.flash("success",`${job.name} projeniz platfomda yayına alındı.`)
    res.status(201).redirect('/jobs');
  } catch (error) {
    res.status(400)
    req.flash("error",`Birşeyler yanlış gitti.... Sonra tekrar deneyiniz.`)
    res.status(400).redirect('/jobs');
  }
};

exports.getAllJobs = async (req, res) => {
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

    const jobs = await Job.find({
      $or:[
        {name: {$regex: '.*' + filter.name + '.*', $options: 'i'}},
        {category:filter.category}
      ]
    }).sort('-createdAt').populate('user');
    const categories = await Category.find();

    const user = await User.findOne({_id:req.session.userID})

    res.status(200).render('jobs',{
      jobs,
      categories,
      page_name:'jobs',
      user,
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getJob = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const job = await Job.findOne({slug: req.params.slug});
    const categories =  await Category.find();
    res.status(200).render('job',{
      job,
      page_name:'jobs',
      user,
      categories
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


exports.enrollJob = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.jobs.push({_id:req.body.job_id});
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.releaseJob = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.jobs.pull({_id:req.body.job_id});
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};



exports.deleteJob = async (req, res) => {
  try {
    
    const job = await Job.findOneAndRemove({slug:req.params.slug})

    req.flash("error", `${job.name} projesi ilanı kaldırıldı.`);

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


exports.updateJob = async (req, res) => {
  try {    

    const job = await Job.findOne({slug:req.params.slug});
    job.name = req.body.name;
    job.description = req.body.description;
    job.category = req.body.category;

    job.save();

    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};


exports.updateJob = async (req, res) => {
  try {   
   const job = await Job.findOne({slug:req.params.slug})
   job.name = req.body.name;
   job.isveren = req.body.isveren;
   job.fiyat = req.body.fiyat;
   job.description = req.body.description;
   job.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};




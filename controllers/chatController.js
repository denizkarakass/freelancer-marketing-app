const Message = require("../models/Message");
const User = require('../models/User');
const Category = require("../models/Category");




exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);

    req.flash("success",`Mesajınız gönderildi.`)
    res.status(201).redirect('/chat');
  } catch (error) {
    res.status(400)
    req.flash("error",`Mesajınız iletilemedi.`)
    res.status(400).redirect('/chat');
  }
};

exports.getAllMessages = async (req, res) => {
  try{
    const user = await User.findOne({_id:req.session.userID})
    const categories = await Category.find();
    const message = await Message.findOne({_id:req.session.userID})  
    res.status(200).render('chat',{
      page_name:'messages',
      user,
      message,
      categories
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};




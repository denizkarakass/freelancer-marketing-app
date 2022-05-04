const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    name: { type: String, required:true },
    description: {type: String, required:true},
    isveren: {type: String, required:true},
    role:{type: String, enum:["freelancer","isveren","admin"],default:"isveren"},
    fiyat: {type: Number, required:true},
    slug:{type:String, unique:true},
    category: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category'
  },
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
    createdAt:{type:Date, default:Date.now },
  });

  JobSchema.pre("validate",function(next){
    this.slug = slugify(this.name, {
      lower:true,
      strict:true,
    })
    next();
  })
  
  const Job = mongoose.model('Job', JobSchema);

  module.exports = Job;
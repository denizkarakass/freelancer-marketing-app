const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    blog_name: { type: String, required:true },
    blog_description: {type: String, required:true},
    slug:{type:String, unique:true},
    category: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category'
  },
    createdAt:{type:Date, default:Date.now },
  });

  BlogSchema.pre("validate",function(next){
    this.slug = slugify(this.name, {
      lower:true,
      strict:true,
    })
    next();
  })
  
  const Blog = mongoose.model('Blog', BlogSchema);

  module.exports = Blog;
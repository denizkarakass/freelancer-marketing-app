const express = require("express");
const subcategoryController = require("../controllers/subCategoryController");
const SubCategory = require("../models/SubCategory");

const router = express.Router();

router.route('/').postsub(categoryController.createSubCategory);
router.route('/:id').delete(categoryController.deleteSubCategory);



module.exports = router;
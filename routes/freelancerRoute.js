const express = require("express");
const freelancerController = require("../controllers/freelancerController");
const girisyapmadanredirectMiddleware = require('../middlewares/girisyapmadanredirectMiddleware');


const router = express.Router();

router.route('/').post(freelancerController.createFreelancer);
router.route('/').get(girisyapmadanredirectMiddleware, freelancerController.getAllFreelancers);
router.route('/:slug').get(freelancerController.getFreelancer);


module.exports = router;
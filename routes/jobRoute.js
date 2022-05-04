const express = require("express");
const jobController = require("../controllers/jobController");
const girisyapmadanredirectMiddleware = require('../middlewares/girisyapmadanredirectMiddleware');
const roleMiddleware = require("../middlewares/roleMiddleware");




const router = express.Router();

router.route('/').post(roleMiddleware(["isveren", "admin"]), jobController.createJob);
router.route('/').get(girisyapmadanredirectMiddleware, jobController.getAllJobs);
router.route('/:slug').get(jobController.getJob);
router.route('/:slug').delete(jobController.deleteJob);
router.route('/:slug').put(jobController.updateJob);
router.route('/:slug').put(jobController.updateJob);
router.route('/enroll').post(jobController.enrollJob);
router.route('/release').post(jobController.releaseJob);




module.exports = router;
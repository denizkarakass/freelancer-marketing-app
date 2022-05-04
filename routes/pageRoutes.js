const express = require("express");
const pageController = require("../controllers/pageController");
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);
router.route('/addProje').get(pageController.getAddProjePage);
router.route('/addCategory').get(pageController.getAddCategoryPage);
router.route('/updateProje').get(pageController.getUpdateProjePage);
router.route('/addFree').get(pageController.getAddFreePage);
router.route('/message').get(pageController.getMessagePage);





module.exports = router;
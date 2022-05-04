const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const { body} = require('express-validator');
const User = require("../models/User");

const router = express.Router();

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Lütfen isim alanını doldurunuz.'),
        body('email').isEmail().withMessage('Lütfen uygun bir email giriniz.')
        .custom((userEmail)=>{
          return User.findOne({email:userEmail}).then(user=> {
              if(user){
                  return Promise.reject('Bu email platformda kayıtlıdır!')
              }
          })
        }),
        body('password').not().isEmpty().withMessage('Lütfen şifre giriniz.')

    ]
    ,authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/:id').delete(authController.deleteUser);




module.exports = router;
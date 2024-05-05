const express = require('express');
const authController = require('../controllers/authController')
const router = express.Router();
const {signupValidation,loginValidation} = require('../validations/authValidation')

router.post('/signup', signupValidation, authController.signup);

router.post('/login', loginValidation, authController.login);

module.exports = router;

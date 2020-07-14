const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/index')

router.post('/signup', UserController.signup)
router.post('/signin', UserController.signin)

module.exports = router
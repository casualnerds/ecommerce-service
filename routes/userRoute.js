const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/index')
const { authorization } = require('../middlewares/index')

router.post('/signup', UserController.signup)
router.post('/signin', UserController.signin)
router.get('/list', authorization, UserController.list)
router.post('/create', authorization, UserController.create)
router.put('/edit/:id', authorization, UserController.update)
router.delete('/delete/:id', authorization, UserController.delete)



module.exports = router
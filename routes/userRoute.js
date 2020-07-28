const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/index')
const { authorizationIsAdmin, authenticate, authorizationUpdateAndDelete } = require('../middlewares/index')
const { multerUpload } = require('../helpers/image')
router.post('/signup', multerUpload.single('profile_picture'), UserController.signup)
router.post('/signin', UserController.signin)

router.use(authenticate)
router.get('/list', authorizationIsAdmin, UserController.list)
router.post('/create', authorizationIsAdmin, multerUpload.single('profile_picture'), UserController.create)
router.put('/edit/:id', authorizationUpdateAndDelete, UserController.update)
router.delete('/delete/:id', authorizationUpdateAndDelete, UserController.delete)

module.exports = router
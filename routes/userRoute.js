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

router.get('/products', authorizationIsAdmin, UserController.getProducts);
router.post('/add-product', authorizationIsAdmin, multerUpload.single('image_url'), UserController.addProduct);
router.put('/edit-product/:productId', authorizationIsAdmin, UserController.editProduct);
router.delete('/delete-product/:productId', authorizationIsAdmin, UserController.deleteProduct);



module.exports = router
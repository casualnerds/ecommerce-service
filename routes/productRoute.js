const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers/index')
const { authorizationIsAdmin, authenticate, authorizationUpdateAndDelete } = require('../middlewares/index')
const { multerUpload } = require('../helpers/image')

router.get('/all', ProductController.getProducts);
router.get('/:id', ProductController.getSingleProduct);
router.use(authenticate)
router.get('/products', authorizationIsAdmin, ProductController.getProducts);
router.post('/add-product', authorizationIsAdmin, multerUpload.single('image_url'), ProductController.addProduct);
router.put('/edit-product/:productId', authorizationIsAdmin, ProductController.editProduct);
router.delete('/delete-product/:productId', authorizationIsAdmin, ProductController.deleteProduct);

module.exports = router
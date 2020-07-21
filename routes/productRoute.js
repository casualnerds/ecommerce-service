const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers/index')

router.get('/all', ProductController.getProducts);
router.get('/:id', ProductController.getSingleProduct);

module.exports = router
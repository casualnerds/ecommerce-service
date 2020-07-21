const express = require('express');
const router = express.Router();

const userRoute = require('./userRoute');
const productRoute = require('./productRoute');

router.use('/users', userRoute);
router.use('/products', productRoute);

module.exports = router;

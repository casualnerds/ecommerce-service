const express = require('express');
const router = express.Router();

const userRoute = require('./userRoute');
const productRoute = require('./productRoute');
const transactionRouter = require('./transactionRouter');

router.use('/users', userRoute);
router.use('/products', productRoute);
router.use('/transactions', transactionRouter);

module.exports = router;

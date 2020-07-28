const express = require('express');
const router = express.Router();
const { TransactionController } = require('../controllers/index')
const { authorizationIsAdmin, authenticate, authorizationUpdateAndDelete } = require('../middlewares/index')

router.use(authenticate)
router.get('/', TransactionController.getSingleUserTransaction)
router.post('/add-to-cart', TransactionController.create)
router.get('/all', TransactionController.getAllTransactions)
router.get('/all-paid', TransactionController.getAllTransactionsPaid)
router.get('/all-arrived', TransactionController.getAllTransactionsArrived)

module.exports = router

const Transaction = require('../models/transaction')
const User = require('../models/user')

class TransactionController {

    static async create(req, res, next) {
        const prodId = req.body.productId

        try {
            let userTransaction =
                await Transaction.findOne({
                    userId: req.decode.id,
                    status: 0
                })

            if (userTransaction) {
                let updatedTransaction = await Transaction.findOneAndUpdate({
                    userId: req.decode.id,
                    status: 0
                }, {
                    $push: {
                        products: prodId
                    }
                }, {
                    new: true
                })

                res.status(200).json(updatedTransaction)

            } else {
                let data = {
                    userId: req.decode.id,
                    products: [prodId]
                }

                let newTransaction = await Transaction.create(data)

                res.status(201).json(newTransaction)
            }

        } catch (error) {
            next(error)
        }


    }

    static getSingleUserTransaction(req, res, next) {
        Transaction.findOne({
            userId: req.decode.id,
            status: 0
        })
            .populate('products')
            .then(transaction => {
                res.status(200).json(transaction)
            })
            .catch(next)
    }

    static getAllTransactions(req, res, next) {
        Transaction.find({
            status: 1
        })
            .populate('products')
            .populate('userId')
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(next)
    }

    static getAllTransactionsPaid(req, res, next) {
        Transaction.find({
            status: 2
        })
            .populate('products')
            .populate('userId')
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(next)
    }

    static getAllTransactionsArrived(req, res, next) {
        Transaction.find({
            status: 3
        })
            .populate('products')
            .populate('userId')
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(next)
    }




}


module.exports = TransactionController
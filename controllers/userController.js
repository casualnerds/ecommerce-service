// const mongoose = require('mongoose');
const User = require('../models/user')
const Product = require('../models/product')
const Helper = require('../helpers/helper')

class UserController {

    static signup(req, res, next) {
        const picture = req.file
        let option = {
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            email: req.body.email,
            profile_picture: picture,

        }

        // console.log(picture + '<===');
        User.create(option)
            .then(data => {

                res.status(201).json(data)
            })
            .catch(next)
    }

    static signin(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user) {
                    if (Helper.comparePassword(req.body.password, user.password)) {
                        let payload = {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }

                        let genToken = Helper.generateJWT(payload)

                        res.status(200).json({
                            token: genToken
                        })
                    } else {
                        next({ code: 404, message: 'invald email/password' })
                    }
                } else {
                    next({ code: 404, message: 'invald email/password' })
                }
            })
            .catch(next)
    }

    static list(req, res, next) {
        User.find({})
            .sort({
                createdAt: -1
            })
            .then(users => {
                res.status(200).json(users)
            })
            .catch(next)
    }

    static create(req, res, next) {
        const picture = req.file
        let option = {
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            email: req.body.email,
            profile_picture: picture,
            isAdmin: true
        }

        User.create(option)
            .then(data => {
                res.status(201).json({
                    data: data,
                    message: 'User Created'
                })
            })
            .catch(next)
    }

    static update(req, res, next) {
        const userId = req.params.id
        const picture = req.file

        let option = {
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: Helper.hashPassword(req.body.password),
            email: req.body.email,
            profile_picture: picture,
        }

        User.findByIdAndUpdate(userId, option)
            .then(user => {
                res.status(201).json({
                    data: user,
                    message: 'User Updated'
                })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(user => {
                res.status(200).json({
                    data: user,
                    message: "User Deleted"
                })
            })
            .catch(next)
    }

    static addProduct(req, res, next) {
        const image = req.file
        let option = {
            name: req.body.name,
            description: req.body.description,
            price: +req.body.price,
            image_url: image,
            rating: +req.body.rating,
            userId: req.decode.id
        }

        Product.create(option)
            .then(data => {
                res.status(201).json({
                    data: data,
                    message: 'Product Created'
                })
            })
            .catch(next)
    }

    static getProducts(req, res, next) {
        Product.find({})
            // .select('name price -_id')
            .populate('userId')
            .sort({
                createdAt: -1
            })
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static editProduct(req, res, next) {

        const prodId = req.params.productId
        const image = req.file

        let option = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image_url: image,
            rating: req.body.rating,

        }
        Product.findByIdAndUpdate(prodId, option)

            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static deleteProduct(req, res, next) {
        Product.findByIdAndRemove({ _id: req.params.productId })
            .then(prod => {
                res.status(200).json('Product Deleted')
            })
            .catch(next)
    }


    static addCart(req, res, next) {
        const prodId = req.params.productId

        let prodData = null
        Product.findById(prodId)
            .then(prod => {
                if (prod) {
                    prodData = prod
                    return User.findById(req.decode.id)
                } else {
                    res.status(401).json("Product not found")
                }
            })
            .then(user => {
                console.log(user);

                if (user) {
                    return user.addToCart(prodData)
                } else {
                    res.status(401).json("User not found")
                }

            })
            .then(result => {
                res.status(200).json({
                    data: result,
                    message: 'Item added to cart'
                })
            })
            .catch(next)
    }


}

module.exports = UserController
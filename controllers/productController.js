const Product = require('../models/product')

class ProductController {

    static getProducts(req, res, next) {
        Product.find({})
            // .populate('userId')
            .sort({
                createdAt: -1
            })
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static getSingleProduct(req, res, next) {
        const productId = req.params.id
        Product.findById(productId)
            .then(product => {
                res.status(200).json(product)
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


}

module.exports = ProductController
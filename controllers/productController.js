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


}

module.exports = ProductController
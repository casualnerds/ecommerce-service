const mongoose = require('mongoose')
const { Schema } = mongoose

const transcationSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

// transcationSchema.methods.addToYourCart = function (product) {
//     const cartProductIndex = this.products.findIndex(cp => {
//         return cp.productId.toString() === product._id.toString()
//     })

//     let newQuantity = 1
//     const updateCartItems = [...this.products]

//     if (cartProductIndex >= 0) {
//         newQuantity = this.products[cartProductIndex].quantity + 1
//         updateCartItems[cartProductIndex].quantity = newQuantity
//     } else {
//         updateCartItems.push({
//             productId: product._id,
//             quantity: newQuantity
//         })
//     }

//     const updatedCart = {
//         items: updateCartItems
//     }

//     this.cart = updatedCart
//     return this.save()
// }

// transcationSchema.methods.removeFromCart = function (productId) {
//     const updateCartItems = this.products.filter(item => {
//         return item.productId.toString() !== productId.toString()
//     })

//     this.products = updateCartItems
//     return this.save()
// }



module.exports = mongoose.model('Transaction', transcationSchema)
const mongoose = require('mongoose')
const { Schema } = mongoose
const Helper = require('../helpers/helper')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password min length is 6']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: function (v) {
                    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) {
                        throw 'Invalid email format'
                    }
                }
            },
            {
                validator: function (v) {
                    return User.find({
                        _id: { $ne: this._id },
                        email: v
                    })
                        .then(data => {
                            if (data.length !== 0) {
                                throw 'Email has been registered'
                            }
                        })
                        .catch(err => {
                            throw err
                        })
                }
            }
        ]
    },
    profile_picture: {
        type: Object
        // required: [true, 'Image required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: { type: Number, required: true }
            }
        ]
    }

}, {
    timestamps: true
})

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString()
    })

    let newQuantity = 1
    const updateCartItems = [...this.cart.items]

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1
        updateCartItems[cartProductIndex].quantity = newQuantity
    } else {
        updateCartItems.push({
            productId: product._id,
            quantity: newQuantity
        })
    }

    const updatedCart = {
        items: updateCartItems
    }

    this.cart = updatedCart
    return this.save()
}

userSchema.pre('save', function (next) {
    this.password = Helper.hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
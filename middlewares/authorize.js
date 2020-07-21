const User = require('../models/user')
const Helper = require('../helpers/helper')
module.exports = {
    authorizationIsAdmin(req, res, next) {
        console.log('masuk authorize')
        try {
            if (req.decode) {
                User.findOne({ email: req.decode.email })
                    .then(user => {
                        if (user) {
                            // isAdmin
                            if (user.isAdmin) {
                                next()
                            } else {
                                res.status(401).json('You are not admin')
                            }
                        } else {
                            res.status(401).json('User Not found ')
                        }
                    })
            } else {
                res.status(401).json('Token not found')
            }
        } catch (error) {
            res.status(401).json('Error')
        }
    },
    authorizationUpdateAndDelete(req, res, next) {
        User.findById(req.params.id)
            .then(user => {
                if (!user) {
                    res.status(404).json('User not found')
                } else {
                    if (req.decode.id == user.id) {
                        next()
                    } else {
                        res.status(403).json('Not Authorized')
                    }
                }
            })
            .catch(next)
    }
}


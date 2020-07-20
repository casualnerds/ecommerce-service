const User = require('../models/user')
const Helper = require('../helpers/helper')
module.exports = {
    authorization(req, res, next) {
        console.log('masuk authorize')
        try {
            if (req.headers.hasOwnProperty('token')) {
                let decode = Helper.verifyJWT(req.headers.token)
                req.decode = decode
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
    }
}


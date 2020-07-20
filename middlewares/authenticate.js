const Helper = require('../helpers/helper')
const User = require('../models/user')

module.exports = {
    authenticate(req, res, next) {
        try {
            if (req.headers.hasOwnProperty('token')) {
                let decode = Helper.verifyJWT(req.headers.token)
                // pass variable to req
                req.decode = decode
                User.findOne({ email: req.decode.email })
                    .then(user => {
                        if (user) {
                            next()
                        } else {
                            res.status(401).json('Not found')
                        }
                    })
            } else {
                res.status(401).json('Please provide token!')
            }
        } catch (error) {
            res.status(401).json('Please provide token!')
        }
    }
}

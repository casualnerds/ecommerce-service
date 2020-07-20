const User = require('../models/user')
const Helper = require('../helpers/helper')

class UserController {

    static signup(req, res, next) {
        let option = {
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            email: req.body.email,
            profile_picture: req.body.profile_picture,
            isAdmin: req.body.isAdmin
        }

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
        let option = {
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            email: req.body.email,
            profile_picture: req.body.profile_picture,
            isAdmin: req.body.isAdmin
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
        User.findById(userId)
            .then(user => {
                if (user) {
                    let option = {
                        username: req.body.username,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        password: req.body.password,
                        email: req.body.email,
                        profile_picture: req.body.profile_picture,
                        isAdmin: req.body.isAdmin
                    }


                    return user.updateOne(option)
                } else {
                    res.status(401).json('User not found')
                }
            })
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
}

module.exports = UserController
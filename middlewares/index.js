const errorHandler = require('./errorHandlers');
const { authenticate } = require('./authenticate');
const { authorizationIsAdmin, authorizationUpdateAndDelete } = require('./authorize');

module.exports = {
    errorHandler,
    authenticate,
    authorizationIsAdmin,
    authorizationUpdateAndDelete
}
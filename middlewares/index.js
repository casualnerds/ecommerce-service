const errorHandler = require('./errorHandlers');
const { authenticate } = require('./authenticate');
const { authorization } = require('./authorize');

module.exports = {
    errorHandler,
    authenticate,
    authorization
}
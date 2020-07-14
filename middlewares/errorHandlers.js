const errorHandler = (err, req, res, next) => {
    console.log('error handling');
    console.log('err: ', err);

    // res.status(404).json(err)
}

module.exports = errorHandler;

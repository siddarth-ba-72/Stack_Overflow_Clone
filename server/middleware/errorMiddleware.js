export const errorMiddleWares = (err, req, res, next) => {

    // ! Wrong MongoDB Id error
    if (err.name === 'CastError') {
        return res.status(400).json({
            error: 'Invalid ID',
            message: `Resource not found with id of ${err.path}`
        });
    }

    // ! Mongoose duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            error: 'Duplicate field value',
            message: `Duplicate value of ${Object.keys(err.keyValue)} entered`
        });
    }

    // ! Wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Invalid Token',
            message: 'Please login to get a valid token'
        });
    }

    // ! JWT expire error
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'Token Expired',
            message: 'Please login to get a valid token'
        });
    }

    res.status(err.statusCode || 500).json({
        error: err.message,
        message: err.message
    });
};
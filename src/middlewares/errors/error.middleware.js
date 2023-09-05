
export function MyException(err, req, res, next) {
    return res.status(err.status).json({
        name: err.name,
        error: err.message,
    });    
}


export function MyException(err, req, res, next) {
    return res.status(err.status || 500).json({
        name: err.name,
        error: err.message,
    });    
}


export function SQLException(err, req, res, next) {
    console.error(`${err.name}  ${err.message}`);
    res.status(500).json({
        type: err.name,
        error: err.message,
    });
    next(err);
    
}




export function SQLException(err, req, res, next) {
    // console.error(err.message);

    res.status(500).json({ 
        type: "SQLException",
        error: err.message,
    });
    next(err)
}

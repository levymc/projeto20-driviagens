
export function SQLException(err, req, res) {
    // console.error(`${err.name}  ${err.message}`);
    console.log("________________________________________________________________________________________")
    res.status(500).json({
        name: err.name,
        error: err.message,
    });
    // next(err);
}


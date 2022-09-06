const filesPayloadExists = (req, res, next) => {
    if(!req.files) {
        res.status(400);
        throw new Error("Missing files!");
    }
    next();
}

module.exports = filesPayloadExists;
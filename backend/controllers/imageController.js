const fs = require('fs');
const path = require('path');
const imagePath = path.join(__dirname, '..', 'public', 'images/');
const asyncHandler = require('express-async-handler');
const NOT_FOUND = "not_found.png";

// @desc    Get image
// @route   GET /images/:image
// @access  Private
const getImage = asyncHandler(async (req, res) => {
    const { image } = req.params;
    //Check if the image exists
    fs.access(imagePath + image, fs.F_OK, (err) => {
        if(err) {
            //Send the "not found" image
            res.status(200).sendFile(imagePath + NOT_FOUND);            
        } else {
            //Send the image
            res.status(200).sendFile(imagePath + image);
        }
    })
});

module.exports = { 
    getImage,
};
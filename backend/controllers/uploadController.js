const path = require('path');
const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');

// @desc    Get file uploader page
// @route   GET /upload
// @access  Public (for now)
const getUpload = asyncHandler(async (req, res) => {
    // const user = await User.findById(req.user.id);
    // if(!user) {
    //     res.status(401);
    //     throw new Error("User not found")
    // }
    res.sendFile(path.join(__dirname, '..', "upload.html"));
});

// @desc    Upload the files
// @route   POST /upload
// @access  Public (for now)
const postUpload = asyncHandler(async (req, res) => {
    // const user = await User.findById(req.user.id);
    // if(!user) {
    //     res.status(401);
    //     throw new Error("User not found")
    // }
    const files = req.files;
    Object.keys(files).forEach(key => {
        const filePath = path.join(__dirname, '..', 'public', 'images', files[key].name);
        files[key].mv(filePath, (err) => {
            if (err) {
                res.status(500);
                throw new Error(err);
            }
        })
    })
    
    res.status(200).json({message: Object.keys(files).toString()});
});

module.exports = {
    getUpload,
    postUpload
}
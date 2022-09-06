const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const { protect } = require('../middleware/authMiddleware');
const { getUpload, postUpload } = require('../controllers/uploadController');
const filesPayloadExists = require('../middleware/filesPayloadExists');
const fileSizeLimiter = require('../middleware/fileSizeLimiter');
const fileExtLimiter = require('../middleware/fileExtLimiter');
const allowedImages = ['.png', '.jpg', '.jpeg', '.gif'];

router.get('/', getUpload);

router.post('/',
    protect,
    fileUpload({
        createParentPath: true,
    }),
    filesPayloadExists,
    fileExtLimiter(allowedImages) ,
    fileSizeLimiter,
    postUpload    
);

module.exports = router;
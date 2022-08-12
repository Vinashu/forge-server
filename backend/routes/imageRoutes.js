const express = require('express');
const router = express.Router();
const { getImage } = require('../controllers/imageController');

router.get('/:image', getImage);

module.exports = router;
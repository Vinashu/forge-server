const express = require('express');
const router = express.Router();
const { checkReward, getRewards, getReward } = require('../controllers/engineController');

router.post('/', checkReward);
router.get('/', getRewards);

router.get('/:id', getReward);

module.exports = router;